import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', () => {
  const current_song = ref({})
  const sound = ref({})
  const seek = ref('00:00')
  const duration = ref('00:00')
  const playerProgress = ref('0%')
  return {

  }
})
