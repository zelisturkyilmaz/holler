<script setup>
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'

const route = useRoute()
const nuxtApp = useNuxtApp()
const auth = useAuthStore()

const song = ref({})
const comments = ref([])

onBeforeMount(async () => {
  const songRef = doc(nuxtApp.$db, 'songs', route.params.id)
  const songSnap = await getDoc(songRef)
  song.value = songSnap.data()
  getComments()
})

const email_alert = computed(() => {
  return auth.user?.emailVerified ? '' : 'bg-gray-300'
})

const show_alert = ref(false)
const in_submission = ref(false)
const alert_variant = ref('bg-blue-500')
const alert_message = ref('Please wait! Your comment is being submitted...')

const commentSchema = ref({
  comment: 'required|min:3',
})

async function addComment(values, { resetForm }) {
  in_submission.value = true
  show_alert.value = true
  const comment = {
    content: values.comment,
    datePosted: new Date().toString(),
    sid: route.params.id,
    name: nuxtApp.$auth.currentUser.displayName,
    uid: nuxtApp.$auth.currentUser.uid,
  }
  await addDoc(collection(nuxtApp.$db, 'comments'), comment)
  song.value.comment_count += 1
  const songRef = doc(nuxtApp.$db, 'songs', route.params.id)
  await updateDoc(songRef, {
    comment_count: song.value.comment_count,
  })

  getComments()

  in_submission.value = false
  alert_variant.value = 'bg-green-500'
  alert_message.value = 'Comment added!'
  resetForm()

  setTimeout(() => {
    show_alert.value = false
  }, 1000)
}

async function getComments() {
  const q = query(collection(nuxtApp.$db, 'comments'), where('sid', '==', route.params.id))

  const querySnapshot = await getDocs(q)
  comments.value = []
  querySnapshot.forEach((doc) => {
    comments.value.push({
      docID: doc.id,
      ...doc.data(),
    })
  })
}
const sortedComments = computed(() => {
  return comments.value.sort((a, b) => {
    return new Date(a.datePosted) - new Date(b.datePosted)
  })
})

async function deleteComment(docId) {
  try {
    await deleteDoc(doc(nuxtApp.$db, 'comments', docId))
    song.value.comment_count -= 1
    const songRef = doc(nuxtApp.$db, 'songs', route.params.id)
    await updateDoc(songRef, {
      comment_count: song.value.comment_count,
    })
    getComments()
  }
  catch (error) {
    return
  }
}
</script>

<template>
  <main class="mb-20">
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div class="absolute inset-0 w-full h-full bg-contain bg-[url('assets/img/song-header.png')] animate-slide -z-[1]"></div>
      <div class="container mx-auto flex items-center">
        <button class="h-24 w-24 text-4xl bg-white text-black rounded-full flex items-center justify-center">
          <Icon name="fa6-solid:play" />
        </button>
        <div class="text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">
            {{ song.modified_name }}
          </div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>
    <section class="container mx-auto mt-6">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="flex">
            {{ song.comment_count ? `${song.comment_count} comment(s)` : 'No comments' }}
            <Icon name="fa-solid:comments" class="text-2xl ml-auto" />
          </span>
        </div>
        <div class="p-6">
          <div
            v-if="show_alert"
            class="text-white text-center font-bold p-4 mb-4"
            :class="alert_variant"
          >
            {{ alert_message }}
          </div>

          <VeeForm v-if="auth.user" :validation-schema="commentSchema" @submit="addComment">
            <div class="mb-3">
              <label class="mb-2 inline-block">Comment:</label>
              <div
                v-if="!auth.user.emailVerified"
                class="text-white text-center p-2 bg-amber-500 rounded-md mb-2"
              >
                Please verify your email to comment
              </div>
              <VeeField
                name="comment" as="textarea" :disabled="!auth.user?.emailVerified"
                class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
                :class="email_alert"
              />
              <VeeErrorMessage name="comment" class="text-red-600" />
            </div>
            <button
              type="submit"
              class="py-1.5 px-3 mx-2 rounded text-white bg-green-600 float-right"
              :disabled="in_submission || !auth.user?.emailVerified"
            >
              Submit
            </button>
          </VeeForm>
        </div>
      </div>
    </section>
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.docID"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <div class="mb-5 flex">
          <div class="font-bold">
            {{ comment.name }}
          </div>
          <time class="ml-auto">{{ comment.datePosted.substring(4, 10) }}, {{ comment.datePosted.substring(10, 16) }} at {{ comment.datePosted.substring(16, 21) }}</time>
        </div>
        <div class="flex">
          <p>{{ comment.content }}</p>
          <button v-if="comment.uid === auth?.user?.uid" class="ml-auto self-end" @click="deleteComment(comment.docID)">
            <Icon name="fa6-solid:trash-can" class="text-red-600" />
          </button>
        </div>
      </li>
    </ul>
  </main>
</template>
