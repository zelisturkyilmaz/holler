<script setup>
const modal = useModalStore()
const tab = ref('login')
</script>

<template>
  <div class="fixed z-10 inset-0 flex justify-center items-start pt-24 bg-black bg-opacity-30 overflow-y-auto" id="authModal" @click.self="modal.hideModal()">
    <div class="bg-white rounded-lg shadow-lg text-left my-8 mx-2 max-w-lg w-full">
      <div class="p-4">
        <div class="flex justify-between items-center">
          <p class="text-xl font-bold">
            Your Account
          </p>
          <div
            class="modal-close cursor-pointer"
            @click="modal.hideModal()"
          >
            <Icon name="material-symbols:close" size="1.5rem" />
          </div>
        </div>
      </div>
      <div class="p-4">
        <ul class="flex mb-4">
          <li class="flex-auto text-center">
            <a
              href="#" class="block p-3 transition"
              :class="{
                'hover:text-teal-600 text-teal-600 border-b border-teal-600': tab === 'login',
                'hover:text-teal-600': tab === 'register',
              }"
              @click.prevent="tab = 'login'"
            >Login</a>
          </li>
          <li class="flex-auto text-center">
            <a
              href="#" class="block p-3 transition"
              :class="{
                'hover:text-teal-600 text-teal-600 border-b border-teal-600': tab === 'register',
                'hover:text-teal-600': tab === 'login',
              }"
              @click.prevent="tab = 'register'"
            >
              Register</a>
          </li>
        </ul>

        <LoginForm v-if="tab === 'login'" />
        <RegisterForm v-if="tab === 'register'" />
      </div>
    </div>
  </div>
</template>
