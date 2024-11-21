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
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue, {
      theme: {
          preset: Aura
      }
    });
app.use(ToastService);

app.component('Menubar', Menubar);
app.component('FileUpload', FileUpload);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ProgressBar', ProgressBar);
app.component('ConfirmationPopup', ConfirmationPopup);
app.component('Toast', Toast);

app.mount('#app');
