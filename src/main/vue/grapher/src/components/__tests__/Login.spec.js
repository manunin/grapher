import {describe, expect, it, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';

import Login from '../../pages/Login/Login.vue';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import {Form, FormField} from '@primevue/forms';
import GIconButton from '../../components/buttons/GIconButton.vue';
import Button from 'primevue/button';
import GPrimaryButton from '../../components/buttons/GPrimaryButton.vue';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';

// const SELECT_FILE_EVENT = 'select';
// const CORRECT_FILE_CONTEXT = {files: [{name: 'file.txt', size: 1048576}]};

vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: (key) => key,
        locale: 'en',
    }),
}));

mockLoadDataWithPost();

function getWrapper() {
    const globalConfig = {
        plugins: [PrimeVue, ToastService],
        components: {Toast, Message, InputText, Password, Form, FormField, GIconButton, Button, GPrimaryButton  },
        t: (key) => key
    };
    return mount(Login, {global: globalConfig});
}

describe('Login form', () => {
    let loginPage;
    beforeEach(() => {
            loginPage = getWrapper();
        }
    );
    it('renders main brand', () => {
        console.log(loginPage.html());
        expect(loginPage.text()).toContain('login.brandLabel');
    });
    it('renders username input', () => {
        let input = loginPage.find('.p-inputtext.p-component.p-inputtext-fluid');
        expect(input.exists()).toBeTruthy();
        expect(input.attributes('placeholder')).toBe('login.username');
    });
    it('renders password input', () => {
        let input = loginPage.find('.p-inputtext.p-component.p-inputtext-fluid.p-password-input');
        expect(input.exists()).toBeTruthy();
        expect(input.attributes('placeholder')).toBe('login.password');
    });
    it('renders submit button', () => {
        let button = loginPage.find('.p-button.p-component');
        expect(button.exists()).toBeTruthy();
        expect(button.text()).toBe('login.login');
    });
    it('renders social login buttons', () => {
        let googleBtn = loginPage.find('.p-button-icon.pi.pi-google');
        expect(googleBtn.exists()).toBeTruthy();
        let facebookBtn = loginPage.find('.p-button-icon.pi.pi-facebook');
        expect(facebookBtn.exists()).toBeTruthy();
        let linkedinBtn = loginPage.find('.p-button-icon.pi.pi-linkedin');
        expect(linkedinBtn.exists()).toBeTruthy();
    });

})

// describe('File validation', () => {
//     let docParser, fileUpload;
//     beforeEach(() => {
//             docParser = getWrapper();
//             fileUpload = docParser.findComponent(FileUpload);
//         }
//     );
//     it('renders error message if file not txt or greater then expected', async () => {
//         try {
//             fileUpload.vm.$emit(SELECT_FILE_EVENT, {files: [{name: 'file.jpg', size: 1048577}]});
//             await nextTick();
//         } catch (e) {
//             // expect(e).toBe('File validation failed');
//         }
//         await waitSec(0.05);
//         expect(findTextOnBody('toast.error.title')).toBeTruthy();
//         expect(findTextOnBody('documentParser.errors.fileFormatNotSupported')).toBeTruthy();
//         expect(findTextOnBody('documentParser.errors.fileExceedsSizeLimit')).toBeTruthy();
//     });
// });
//
// describe('File selection event', () => {
//     let docParser, fileUpload;
//     beforeEach(() => {
//         docParser = getWrapper();
//         fileUpload = docParser.findComponent(FileUpload);
//     });
//     it('check spinner appearance', async () => {
//         const fileProcessingText = 'documentParser.fileProcessing';
//         fileUpload.vm.$emit(SELECT_FILE_EVENT, CORRECT_FILE_CONTEXT);
//         await waitSec(0.005);
//         expect(docParser.text()).toContain(fileProcessingText);
//         await waitSec(0.020);
//         expect(docParser.text()).not.toContain(fileProcessingText);
//     });
//     it('while processing Upload button is hidden', async () => {
//         const uploadButtonText = 'documentParser.buttons.upload';
//         fileUpload.vm.$emit(SELECT_FILE_EVENT, CORRECT_FILE_CONTEXT);
//         await waitSec(0.005);
//         expect(docParser.text()).not.toContain(uploadButtonText);
//         await waitSec(0.020);
//         expect(docParser.text()).toContain(uploadButtonText);
//     });
// })


// async function waitSec(sec) {
//     await new Promise(resolve => setTimeout(resolve, sec * 1000));
// }

function mockLoadDataWithPost() {
    vi.mock('@/rest/utils', () => ({
        loadDataWithPost: async () => {
            await new Promise(resolve => setTimeout(resolve,  20));
        }
    }));
}

// function findTextOnBody(text) {
//     return document.querySelector('body').textContent.includes(text);
// }