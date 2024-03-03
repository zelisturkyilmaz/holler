<script setup>
import { collection, getDocs, query, where } from 'firebase/firestore'

definePageMeta({
  middleware: ['auth'],
})

const nuxtApp = useNuxtApp()
const auth = useAuthStore()

onBeforeMount(async () => {
  const q = query(collection(nuxtApp.$db, 'songs'), where('uid', '==', auth.user.uid))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    addSong(doc)
  })
})

const songs = ref([])

function updateSong(songIndex, values) {
  songs.value[songIndex].modified_name = values.modified_name
  songs.value[songIndex].genre = values.genre
}
function removeSong(i) {
  songs.value.splice(i, 1)
}

function addSong(document) {
  const song = {
    ...document.data(),
    docID: document.id,
  }

  songs.value.push(song)
}
</script>

<template>
  <main>
    <section class="container mx-auto mt-6 pb-24">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <Upload @add-song="addSong" />
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 flex flex-col ">
            <div class="p-6 font-bold border-b border-gray-200 flex items-center ">
              My songs
              <Icon name="fa6-solid:compact-disc" class="ml-auto text-green-400 text-2xl" />
            </div>
            <div class="p-6">
              <UploadItem
                v-for="(song, songIndex) in songs"
                :key="song.docID"
                :song="song"
                :song-index="songIndex"
                @update-song="updateSong"
                @remove-song="removeSong"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
