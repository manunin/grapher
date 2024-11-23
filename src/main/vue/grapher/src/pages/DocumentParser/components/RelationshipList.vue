<template>
  <div class="card">
    Result
    <DataTable :value="parsedResults" tableStyle="min-width: 50rem">
      <Column field="link" header="Link"></Column>
    </DataTable>
  </div>
</template>

<script setup>

import {defineProps, computed} from 'vue';

const props = defineProps({
  results: Array,
});

const parsedResults = computed(() => {
  return props.results?.map((result) => {
    return {
      link: result.source?.name + ' -> ' + result.target?.name,
    };
  });
});
</script>

<style scoped>

</style>