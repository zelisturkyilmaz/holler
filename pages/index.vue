<script setup>

</script>

<template>
  <div>
    <section class="mb-8 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain bg-[url('assets/img/header.png')] animate-slide -z-[1]"></div>
      <div class="container mx-auto">
        <h1 class="font-bold text-4xl mb-5">
          Unleash Your Sound
        </h1>
        <p class="w-9/12 mx-auto text-lg">
          Welcome to Howler, where the language is music, and every beat tells a story. Step into a realm where sound knows no boundaries, and the rhythm is the universal language.
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
          <NuxtLink class="p-3 pl-6 flex justify-between items-center hover:bg-gray-100 border-b song-link" to="/song/1">
            <span>Song 1</span>
            <div class="flex items-center">
              <Icon name="fa-solid:comments" size="1.5rem" />
              <span class="ml-1 text-lg">14</span>
            </div>
          </NuxtLink>
          <NuxtLink class="p-3 pl-6 flex justify-between items-center hover:bg-gray-100 border-b song-link" to="/song/1">
            <span>Song 1</span>
            <div class="flex items-center">
              <Icon name="fa-solid:comments" size="1.5rem" />
              <span class="ml-1 text-lg">14</span>
            </div>
          </NuxtLink>
          <NuxtLink class="p-3 pl-6 flex justify-between items-center hover:bg-gray-100 border-b song-link" to="/song/1">
            <span>Song 1</span>
            <div class="flex items-center">
              <Icon name="fa-solid:comments" size="1.5rem" />
              <span class="ml-1 text-lg">14</span>
            </div>
          </NuxtLink>
        </ol>
      </div>
    </section>
  </div>
</template>
