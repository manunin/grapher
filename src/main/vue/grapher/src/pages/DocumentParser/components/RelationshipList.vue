<template>
  <div class="mt-4 p-4 bg-gray-100 rounded">
    <DataTable :value="parsedResults"
               tableStyle="min-width: 50rem">
      <template #empty> {{t('documentParser.noRelationshipsFound')}} </template>
      <Column field="link" header="Link"></Column>
    </DataTable>
  </div>
</template>

<script setup>

import {defineProps, computed} from 'vue';
import {useI18n} from 'vue-i18n';
const {t} = useI18n();

const props = defineProps({
  results: Array,
});

const parsedResults = computed(() => {
  return props.results?.map((result) => {
    return {
      link: result.source?.name + '--' + result.type + '--' + result.target?.name,
    };
  });
});
</script>

<style scoped>

</style>