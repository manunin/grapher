<template>
  <DocumentParser/>
</template>


<script setup>
import { ref, defineComponent} from 'vue';
import DocumentParser from './pages/DocumentParser/DocumentParser.vue';

defineComponent({
  components: {
    DocumentParser
  }
})

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-fw pi-file',
    },
    {
        label: 'About',
        icon: 'pi pi-fw pi-pencil',
    },
    {
        label: 'Contacts',
        icon: 'pi pi-fw pi-user'
    },
])


</script>

<style scoped>


</style>
