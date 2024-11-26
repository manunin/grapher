<template>
  <div class="py-8 px-24 h-full flex flex-col">
    <FileUpload v-if="!processing"
                choose-label="Upload"
                mode="basic"
                @select="onFileSelect"/>
    <template v-else>
      <p>File processing...</p>
      <ProgressBar mode="indeterminate" style="height: 6px"/>
    </template>
    <RelationshipList class="flex-grow" :results="results"/>
    <Toast/>
  </div>
</template>

<script setup>

import RelationshipList from './components/RelationshipList.vue';
import {defineComponent, ref} from 'vue';
import {useToast} from 'primevue/usetoast';
import {useOverlay} from '@/composable/useoverlay';
import {MAX_FILE_SIZE} from "@/pages/DocumentParser/constants.js";
import UploadService from "@/pages/DocumentParser/service/UploadService.js";

defineComponent({
  components: {
    RelationshipList
  }
})
const getMaxFileSize = () => MAX_FILE_SIZE;
const uploadService = UploadService.getInstance();
const toast = useToast();
const overlay = useOverlay();

const processing = ref(false);
const results = ref([]);

const extractFile = (event) => {
  return event.files[0];
}

const onFileSelect = (event) => {
  const file = extractFile(event);
  validateFile(file);
  uploadFile(file);
};

const validateFile = (file) => {
  if (file.size > getMaxFileSize()) {
    toast.add({severity: 'error', summary: 'Error', detail: 'File size exceeds the limit'});
    throw new Error('File size exceeds the limit');
  }
  if (file.name.split('.').pop() !== 'txt') {
    toast.add({severity: 'error', summary: 'Error', detail: 'Only .txt files are allowed'});
    throw new Error('Only .txt files are allowed');
  }
}

const uploadFile = async (file) => {
  const formData = prepareFormData(file);
  processing.value = true;
  uploadService.uploadFile(formData)
      .then((response) => results.value = response)
      .finally(() => processing.value = false);
};

const prepareFormData = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
}

</script>

<style scoped>

</style>