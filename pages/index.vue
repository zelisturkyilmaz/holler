<script setup>
import { collection, getDocs } from 'firebase/firestore'

const nuxtApp = useNuxtApp()
const songs = ref([])

onMounted(async () => {
  const songsSnap = await getDocs(collection(nuxtApp.$db, 'songs'))
  songsSnap.forEach((doc) => {
    songs.value.push({
      docID: doc.id,
      ...doc.data(),
    })
  })
})
</script>

<template>
  <main>
    <section class="py-24  text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain bg-[url('assets/img/header.png')] animate-slide -z-[1]"></div>
      <div class="container mx-auto">
        <h1 class="font-bold md:text-4xl text-2xl mb-5">
          Unleash Your Sound
        </h1>

        <p class="w-9/12 mx-auto md:text-lg">
          Step into a realm where sound knows no boundaries, and the rhythm is the universal language.
        </p>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>
    <section class="container mx-auto py-20">
      <div class="bg-white rounded border flex flex-col">
        <div class="flex justify-between items-center font-bold px-6 py-4 border-b">
          <span class="mr-auto">Songs</span>
          <Icon name="fa-solid:headphones-alt" size="2rem" />
        </div>
        <ol>
          <SongItem v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
      </div>
    </section>
  </main>
</template>
