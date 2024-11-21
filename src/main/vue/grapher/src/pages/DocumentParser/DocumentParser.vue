<template>
  <div>
    <FileUpload v-if="!processing"
                choose-label="Upload"
                mode="basic"
                @select="onFileSelect"/>
    <template v-else>
      <p>File processing...</p>
      <ProgressBar mode="indeterminate" style="height: 6px"/>
    </template>
    <RelationshipList :results="results"/>
    <Toast/>
  </div>
</template>

<script setup>

import RelationshipList from './components/RelationshipList.vue';
import {defineComponent, ref} from 'vue';
import {useToast} from 'primevue/usetoast';
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
  uploadService.uploadFile(formData).then((response) => {
    if (response.status !== 200) {
      toast.add({severity: 'error', summary: 'Error', detail: 'File upload failed'});
      processing.value = false;
      return;
    }
    toast.add({severity: 'success', summary: 'Success', detail: 'File uploaded'});
    results.value = response.data;
    console.log(response);
  }).catch((error) => {
    toast.add({severity: 'error', summary: 'Error', detail: 'File upload failed'});
  }).finally(() => {
    processing.value = false;
  });
};

const prepareFormData = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
}

</script>

<style scoped>

</style>