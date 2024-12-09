<template>
  <div>
    <login v-if="!loggedIn"></login>
    <div v-else class="h-screen">
      <DocumentParser/>
      <Overlay/>
    </div>
    <Toast/>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const loggedIn = ref(false)
</script>

<style scoped>
</style>
