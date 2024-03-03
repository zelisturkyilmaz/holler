<script setup>
const props = defineProps(['song'])
</script>

<template>
  <NuxtLink class="p-3 pl-6 flex justify-between items-center hover:bg-gray-100 border-b" :to="`/song/${props.song.docID}`">
    <div>
      <span class="font-thin">{{ props.song.modified_name }}</span> <span> by {{ props.song.display_name }}</span>
    </div>
    <div class="flex items-center">
      <Icon name="fa-solid:comments" size="1.5rem" />
      <span class="ml-1 text-lg">{{ props.song.comment_count }}</span>
    </div>
  </NuxtLink>
</template>
