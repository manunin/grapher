<template>
  <div class="py-8 px-24 h-full flex flex-col">
    <file-upload v-if="!processing"
                :choose-label="t('documentParser.buttons.upload')"
                mode="basic"
                :file-limit=1
                auto
                @select="onFileSelect"/>
    <template v-else>
      <p>{{t('documentParser.fileProcessing')}}</p>
      <progress-bar mode="indeterminate" style="height: 6px"/>
    </template>
    <relationship-list class="flex-grow" :results="results"/>
    <Toast/>
  </div>
</template>

<script setup>

import {ref} from 'vue';
import {useToast} from 'primevue/usetoast';
import {MAX_FILE_SIZE, ALLOWED_FORMATS} from "@/pages/DocumentParser/constants.js";
import UploadService from "@/pages/DocumentParser/service/UploadService.js";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const uploadService = UploadService.getInstance();
const toast = useToast();
const processing = ref(false);
const results = ref([]);

const onFileSelect = (event) => {
  const file = extractFile(event);
  validateFile(file);
  uploadFile(file);
};
const extractFile = (event) => {
  return event.files[0];
}
const validateFile = (file) => {
  let hasError = false;
  if (file.size > MAX_FILE_SIZE) {
    const detail = t('documentParser.errors.fileExceedsSizeLimit');
    toast.add({severity: 'error', summary: t('toast.error.title'), detail: detail});
    hasError = true;
  }
  if (!isAllowedFormat(file)) {
    const detail = t('documentParser.errors.fileFormatNotSupported');
    toast.add({severity: 'error', summary: t('toast.error.title'), detail: detail});
    hasError = true;
  }
  if (hasError) {
    throw new Error('File validation failed');
  }
}
const uploadFile = async (file) => {
  const formData = prepareFormData(file);
  processing.value = true;
  uploadService.uploadFile(formData)
      .then((response) => results.value = response)
      .finally(() => processing.value = false);
};
const isAllowedFormat = (file) => {
  return ALLOWED_FORMATS.includes(file.name.split('.').pop());
}
const prepareFormData = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
}
</script>

<style scoped>
</style>