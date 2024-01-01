<!-- eslint-disable vue/html-self-closing -->
<template>
  <teleport to="body">
    <div class="fixed inset-0 flex justify-center items-start pt-24 bg-black bg-opacity-30 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-lg text-left my-8 mx-2 max-w-lg w-full">
        <div class="p-4">
          <div class="flex justify-between items-center">
            <p class="text-2xl font-bold">
              Your Account
            </p>
            <div
              class="modal-close cursor-pointer"
            >
              <Icon name="material-symbols:cancel" size="1.5rem"/>
              
            </div>
          </div>
        </div>
        <div class="p-4">
          BaseModal
        </div>
        <div class="flex justify-end items-center p-4">
          <button class="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-white">
            Button
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
