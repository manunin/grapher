import {describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {nextTick} from 'vue';

import DocumentParser from '../../pages/DocumentParser/DocumentParser.vue';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import UploadService from '../../pages/DocumentParser/service/UploadService';
import PrimeVue from 'primevue/config';

const SELECT_FILE_EVENT = 'select';
const FILE_CONTEXT = {files: [{name: 'file.txt', size: 100}]};

describe('Document parser', () => {
    it('renders Upload button', () => {
        const wrapper = getWrapper();
        findUploadButton(wrapper).toBeTruthy();
    });
    it('renders Result panel', () => {
        const wrapper = getWrapper();
        expectText(wrapper, 'Result');
    });
    it('renders Table with column with name Link', () => {
        const wrapper = getWrapper();
        expect(wrapper.findAll('th').find(el => el.text() === 'Link')).toBeTruthy();
    });
})

describe('File validation', () => {
    it('renders error message if file not txt', async () => {
        const wrapper = getWrapper();
        const fileUpload = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUpload, SELECT_FILE_EVENT, {files: [{name: 'file.jpg'}]});
        await nextTick();
        expect(findTextOnBody('Error')).toBeTruthy();
        expect(findTextOnBody('Only .txt files are allowed')).toBeTruthy();
    });
    it('renders error message if file size exceeds 1MB', async () => {
        const wrapper = getWrapper();
        const fileUpload = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUpload, SELECT_FILE_EVENT, {files: [{name: 'file.txt', size: 1048576}]});
        await nextTick();
        expect(findTextOnBody('Error')).toBeTruthy();
        expect(findTextOnBody('File size exceeds the limit')).toBeTruthy();
    });
    it('renders success if the file is txt and less or equals 1MB', async () => {
        const wrapper = getWrapper();
        const fileUpload = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUpload, SELECT_FILE_EVENT, FILE_CONTEXT);
        await nextTick();
        expect(findTextOnBody('Success')).toBeTruthy
    });
});

describe('File selection event', () => {
    it('check spinner appearance', async () => {
        const wrapper = getWrapper();
        const fileUpload = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUpload, SELECT_FILE_EVENT, FILE_CONTEXT);
        await waitSec(1);
        expectText(wrapper, 'File processing');
        await waitSec(3);
        notExpectText(wrapper, 'File processing...');
    });
    it('while processing Upload button is hidden', async () => {
        const wrapper = getWrapper();
        const fileUpload = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUpload, SELECT_FILE_EVENT, FILE_CONTEXT);
        await waitSec(1);
        notExpectText(wrapper, 'Upload');
        await waitSec(3);
        expectText(wrapper, 'Upload');
    });
    it('Show pop-up error if error ', async () => {
        mockUnsuccessfulUploadServiceResponse()
        const wrapper = getWrapper();
        const fileUpload = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUpload, SELECT_FILE_EVENT, FILE_CONTEXT);
        await waitSec(1);
        expect(findTextOnBody('Error')).toBeTruthy();
    });

    it('Show success message if success', async () => {
        mockUploadServiceSuccessResponse();
        const wrapper = getWrapper();
        const fileUploadComponent = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUploadComponent, SELECT_FILE_EVENT, FILE_CONTEXT);
        await waitSec(1);
        expect(findTextOnBody('Success')).toBeTruthy();
    });

    it('Show error message if success but not 200', async () => {
        mockUploadServiceSuccessResponseNot200();
        const wrapper = getWrapper();
        const fileUploadComponent = wrapper.findComponent(FileUpload);
        emitEventWithContext(fileUploadComponent, SELECT_FILE_EVENT, FILE_CONTEXT);
        await waitSec(1);
        expect(findTextOnBody('Error')).toBeTruthy();
    });
})

function getWrapper() {
    const globalConfig = {
        plugins: [PrimeVue, ToastService],
        components: {FileUpload, DataTable, Column, ProgressBar, Toast},
    };
    return mount(DocumentParser, {global: globalConfig});
}

function findUploadButton(wrapper) {
    return expect(wrapper.findAll('button').find(el => el.text() === 'Upload'));
}

async function waitSec(sec) {
    await new Promise(resolve => setTimeout(resolve, sec * 1000));
}

function expectText(wrapper, text) {
    expect(wrapper.text()).toContain(text);
}

function emitEventWithContext(fileUpload, event, context) {
    fileUpload.vm.$emit(event, context);
}

function notExpectText(wrapper, text) {
    expect(wrapper.text()).not.toContain(text);
}

function mockUploadServiceSuccessResponse() {
    vi.spyOn(UploadService, 'getInstance').mockImplementation(() => {
        return {
            uploadFile: () => {
                return Promise.resolve({status: 200});
            }
        }
    });
}

function mockUploadServiceSuccessResponseNot200() {
    vi.spyOn(UploadService, 'getInstance').mockImplementation(() => {
        return {
            uploadFile: () => {
                return Promise.resolve({status: 401});
            }
        }
    });
}

function mockUnsuccessfulUploadServiceResponse() {
    vi.spyOn(UploadService, 'getInstance').mockImplementation(() => {
        return {
            uploadFile: () => {
                return Promise.reject({status: 500});
            }
        }
    });
}

function findTextOnBody(text) {
    return document.querySelector('body').textContent.includes(text);
}