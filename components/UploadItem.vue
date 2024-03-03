<script setup>
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'

const props = defineProps(['song', 'songIndex'])

const emit = defineEmits(['updateSong', 'removeSong'])

const nuxtApp = useNuxtApp()

const updateSchema = ref({
  modified_name: 'required',
  genre: 'alpha_spaces',
})

const showForm = ref(false)
const show_alert = ref(false)
const alert_variant = ref('bg-blue-500')
const alert_message = ref('Please wait! Updating song info...')
const in_submission = ref(false)

async function update(values) {
  in_submission.value = true
  show_alert.value = true

  try {
    const songRef = doc(nuxtApp.$db, 'songs', props.song.docID)
    await updateDoc(songRef, values)
  }
  catch (error) {
    in_submission.value = false
    alert_variant.value = 'bg-red-500'
    alert_message.value = 'Something went wrong! Try again later'
    return
  }

  emit('updateSong', props.songIndex, values)

  in_submission.value = false
  show_alert.value = false
  showForm.value = false
}

async function deleteSong() {
  await deleteDoc(doc(nuxtApp.$db, 'songs', props.song.docID))
  emit('removeSong', props.songIndex)
}
</script>

<template>
  <div class="border border-gray-200 p-2 mb-4 rounded">
    <div v-show="!showForm" class="flex">
      <span class="text-lg font-bold">
        {{ props.song.modified_name }}
      </span>
      <div class="ml-auto space-x-3">
        <button @click="deleteSong">
          <Icon name="fa6-solid:trash-can" class="text-red-600" />
        </button>
        <button @click="showForm = !showForm">
          <Icon name="fa6-solid:pen-to-square" class="text-blue-600" />
        </button>
      </div>
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        class="text-white text-center font-bold p-2 mb-4 rounded"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <VeeForm :validation-schema="updateSchema" :initial-values="props.song" @submit="update">
        <div class="mb-3">
          <label class="mb-2 inline-block">Song Title:</label>
          <VeeField
            name="modified_name" type="text"
            class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
          />
          <VeeErrorMessage name="modified_name" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="mb-2 inline-block">Genre:</label>
          <VeeField
            name="genre" type="text"
            class="block w-full border border-gray-400 rounded p-2 text-gray-800 focus:outline-none focus:border-black"
          />
          <VeeErrorMessage name="genre" class="text-red-600" />
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
            :disabled="in_submission"
          >
            Update
          </button>
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            :disabled="in_submission"
            @click="showForm = false"
          >
            Cancel
          </button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>
