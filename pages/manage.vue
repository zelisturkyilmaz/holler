<script setup>
definePageMeta({
  middleware: ['auth'],
})

const drag_over = ref(false)

function upload($event) {
  drag_over.value = false
  const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]
  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') return

    console.log(file)
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
                :class="{ 'bg-green-400 border-green-400 border-solid': drag_over }"
                @dragenter.prevent="drag_over = true"
                @dragleave.prevent="drag_over = false"
                @dragover.prevent="drag_over = true"
                @dragend.prevent="drag_over = false"
                @drop.prevent="upload($event)"
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
