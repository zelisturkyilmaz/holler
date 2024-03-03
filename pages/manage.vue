<script setup>
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, getDoc } from 'firebase/firestore'

definePageMeta({
  middleware: ['auth'],
})

const nuxtApp = useNuxtApp()

const is_dragover = ref(false)
const uploads = ref([])

function upload($event) {
  is_dragover.value = false

  const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]
  files.forEach(async (file, index) => {
    if (file.type !== 'audio/mpeg')
      return

    const fileRef = storageRef(nuxtApp.$storage, `songs/${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)

    const uploadIndex = uploads.value.push({
      uploadTask,
      current_progress: 0,
      name: file.name,
      variant: 'bg-green-400',
      icon: 'fa6-solid:spinner',
      text_class: '',
    }) - 1

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      uploads.value[uploadIndex].current_progress = progress
    }, () => {
      uploads.value[uploadIndex].variant = 'bg-red-400'
      uploads.value[uploadIndex].icon = 'fa6-solid:file-circle-xmark'
      uploads.value[uploadIndex].text_class = 'text-red-400'
    }, () => {
      const song = {
        uid: nuxtApp.$auth.currentUser.uid,
        display_name: nuxtApp.$auth.currentUser.displayName,
        original_name: uploadTask.snapshot.ref.name,
        modified_name: uploadTask.snapshot.ref.name,
        genre: '',
        comment_count: 0,
      }
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        song.url = downloadURL
        await addDoc(collection(nuxtApp.$db, 'songs'), song)
      })
      uploads.value[uploadIndex].variant = 'bg-green-400'
      uploads.value[uploadIndex].icon = 'fa6-solid:check'
      uploads.value[uploadIndex].text_class = 'text-green-400'
    })
  })
}
</script>

<template>
  <main>
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <div class="bg-white rounded border border-gray-200 flex flex-col ">
            <div class="p-6 font-bold border-b border-gray-200 flex items-center space-x-1">
              <Icon name="fa-solid:upload" class="text-green-400" />
              <span>Upload</span>
            </div>
            <div class="p-6">
              <div
                class="w-full px-10 py-20 mb-1 text-center text-gray-400 rounded border border-dashed border-gray-400 cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid transition duration-500"
                :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
                @drag.prevent.stop=""
                @dragstart.prevent.stop=""
                @dragenter.prevent.stop="is_dragover = true"
                @dragleave.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true"
                @dragend.prevent.stop="is_dragover = false"
                @drop.prevent.stop="upload($event)"
              >
                <h5>Drop your files here</h5>
              </div>
              <input type="file" multiple @change="upload($event)" />
              <div v-for="upload in uploads" :key="upload.name" class="mb-4">
                <div class="font-bold text-sm">
                  <Icon :name="upload.icon" />
                  {{ upload.name }}
                </div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                  <div
                    class="bg-green-400"
                    :class="upload.variant"
                    :style="{ width: `${upload.current_progress}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          09
        </div>
      </div>
    </section>
  </main>
</template>
