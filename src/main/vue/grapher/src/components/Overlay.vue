<template>
  <div class="overlay" v-if="overlay">
    <ProgressSpinner/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useOverlay } from '@/composable/useoverlay';

const overlay = ref(false);
const { subscribeOnShow, subscribeOnHide } = useOverlay();

subscribeOnShow(() => {
  overlay.value = true;
});
subscribeOnHide(() => {
  overlay.value = false;
});
</script>

<style scoped>
.overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1000;
}
</style>