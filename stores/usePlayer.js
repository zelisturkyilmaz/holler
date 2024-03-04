import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', () => {
  const current_song = ref({})
  const sound = ref({})
  const seek = ref('00:00')
  const duration = ref('00:00')
  const playerProgress = ref('0%')

  async function newSong(song) {
    if (sound.value instanceof Howl)
      sound.value.unload()

    current_song.value = song

    sound.value = new Howl({
      src: [song.url],
      html5: true,
    })

    sound.value.play()

    sound.value.on('play', () => {
      requestAnimationFrame(progress)
    })
  }

  async function toggleAudio() {
    if (!sound.value.playing)
      return

    if (sound.value.playing())
      sound.value.pause()
    else
      sound.value.play()
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0
    const seconds = Math.round(time - minutes * 60 || 0)

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  function progress() {
    seek.value = formatTime(sound.value.seek())
    duration.value = formatTime(sound.value.duration())

    playerProgress.value = `${(sound.value.seek() / sound.value.duration()) * 100}%`

    if (sound.value.playing())
      requestAnimationFrame(progress)
  }

  function updateSeek(event) {
    if (!sound.value.playing)
      return

    const { x, width } = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - x
    const percentage = clickX / width
    const seconds = sound.value.duration() * percentage

    sound.value.seek(seconds)
    sound.value.once('seek', progress)
  }

  const playing = computed(() => {
    if (sound.value.playing)
      return sound.value.playing()

    return false
  })

  return {
    current_song,
    seek,
    duration,
    playerProgress,
    toggleAudio,
    updateSeek,
    newSong,
    playing,
  }
})
