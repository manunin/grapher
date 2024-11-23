<template>
  <div>
    <DocumentParser/>
    <Overlay/>
  </div>
</template>


<script setup>
import { defineComponent} from 'vue';
import DocumentParser from './pages/DocumentParser/DocumentParser.vue';

defineComponent({
  components: {
    DocumentParser
  }
})
</script>

<style scoped>


</style>
