<script setup>
const route = useRoute()
</script>

<template>
  <div>
    Song ID: {{ route.params.id }}
  </div>
</template>
