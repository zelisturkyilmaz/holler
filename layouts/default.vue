<script setup>
</script>

<template>
  <div>
    <!-- <div v-show="auth.userCred">Not verified</div> -->
    <Header />
    <slot></slot>

    <Player />
  </div>
</template>
