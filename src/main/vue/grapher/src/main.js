import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Menubar from 'primevue/menubar';
import FileUpload from "primevue/fileupload";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';
import ConfirmationPopup from 'primevue/confirmpopup';
import ProgressSpinner from "primevue/progressspinner";
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import DocumentParser from "@/pages/DocumentParser/DocumentParser.vue";
import RelationshipList from "@/pages/DocumentParser/components/RelationshipList.vue";
import Overlay from "@/components/Overlay.vue";

import {createI18n} from "vue-i18n";
import enDocumentParser from "@/i18n/documentParser/en";
import enToast from "@/i18n/toast/en";

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {...enDocumentParser, ...enToast}
    }
});

const app = createApp(App);
app.use(PrimeVue, {
      theme: {
          preset: Aura
      }
    });

app.use(ToastService);
app.use(i18n);

app.component('Menubar', Menubar);
app.component('FileUpload', FileUpload);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ProgressBar', ProgressBar);
app.component('ConfirmationPopup', ConfirmationPopup);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Toast', Toast);
app.component('Overlay', Overlay);
app.component('DocumentParser', DocumentParser);
app.component('RelationshipList', RelationshipList);

app.mount('#app');
