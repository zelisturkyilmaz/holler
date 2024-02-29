<!-- eslint-disable style/padded-blocks -->
<!-- eslint-disable no-useless-return -->
<script setup>
import { ref as storageRef, uploadBytesResumable } from 'firebase/storage'

definePageMeta({
  middleware: ['auth'],
})

const nuxtApp = useNuxtApp()

const is_dragover = ref(false)
const uploads = ref([])

function upload($event) {
  is_dragover.value = false

  const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]
  files.forEach(async (file) => {
    if (file.type !== 'audio/mpeg') return

    const fileRef = storageRef(nuxtApp.$storage, `songs/${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)

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
