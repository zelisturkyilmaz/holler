<template>
  <div class="fixed bottom-0 left-0 bg-white px-4 pb-4 pt-1 w-full border-t">
    <div class="text-center">
      <span class="font-bold">Title by Artist</span>
    </div>
    <div class="flex items-center gap-3">
      <button>
        <Icon name="fa-solid:play" size="1.5rem" />
      </button>
      <div class="currentTime">01:30</div>
      <div class="progress w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <span class="absolute -top-2.5 left-1/3 -ml-2.5 text-gray-800 text-lg">
            <Icon name="fa-solid:circle" size="1.5rem" />
        </span>
        <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400 w-1/3"></span>
      </div>
      <div class="duration">03.00</div>
    </div>
  </div>
</template>
