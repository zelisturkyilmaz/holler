<script setup>
const player = usePlayerStore()
const playing = computed(() => {
  return player.playing ? 'fa6-solid:pause' : 'fa-solid:play' 
})
</script>

<template>
  <div class="fixed bottom-0 left-0 bg-white p-4 w-full border-t">
    <div v-if="player.current_song.modified_name" class="text-center">
      <span class="font-bold">{{ player.current_song.modified_name }} by {{ player.current_song.display_name }}</span>
    </div>
    <div class="flex items-center gap-3">
      <button @click.prevent="player.toggleAudio">
        <Icon :name="playing" size="1.5rem" />
      </button>
      <div class="currentTime">
        {{ player.seek }}
      </div>
      <div class="progress w-full h-2 rounded bg-gray-200 relative cursor-pointer" @click.prevent="player.updateSeek">
        <span class="absolute -top-2.5 left-1/3 -ml-2.5 text-gray-800 text-lg" :style="{ left: player.playerProgress }">
          <Icon name="fa-solid:circle" size="1.5rem" />
        </span>
        <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400 w-1/3" :style="{ width: player.playerProgress }"></span>
      </div>
      <div class="duration">
        {{ player.duration }}
      </div>
    </div>
  </div>
</template>
