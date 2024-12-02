import {describe, expect, it, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {nextTick} from 'vue';

import DocumentParser from '../../pages/DocumentParser/DocumentParser.vue';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import RelationshipList from '../../pages/DocumentParser/components/RelationshipList.vue';
import PrimeVue from 'primevue/config';

const SELECT_FILE_EVENT = 'select';
const CORRECT_FILE_CONTEXT = {files: [{name: 'file.txt', size: 1048576}]};

vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: (key) => key,
        locale: 'en',
    }),
}));

mockLoadDataWithPost();

describe('Document parser', () => {
    let docParser;
    beforeEach(() => {
            docParser = getWrapper();
        }
    );
    it('renders Upload button', () => {
        expect(docParser.text()).toContain('documentParser.buttons.upload');
    });
    it('renders Result panel', () => {
        expect(docParser.text()).toContain('documentParser.noRelationshipsFound');
    });
    it('renders Table with column with name Link', () => {
        expect(docParser.findAll('th').find(el => el.text() === 'Link')).toBeTruthy();
    });
})

describe('File validation', () => {
    let docParser, fileUpload;
    beforeEach(() => {
            docParser = getWrapper();
            fileUpload = docParser.findComponent(FileUpload);
        }
    );
    it('renders error message if file not txt or greater then expected', async () => {
        try {
            fileUpload.vm.$emit(SELECT_FILE_EVENT, {files: [{name: 'file.jpg', size: 1048577}]});
            await nextTick();
        } catch (e) {
            // expect(e).toBe('File validation failed');
        }
        await waitSec(0.05);
        expect(findTextOnBody('toast.error.title')).toBeTruthy();
        expect(findTextOnBody('documentParser.errors.fileFormatNotSupported')).toBeTruthy();
        expect(findTextOnBody('documentParser.errors.fileExceedsSizeLimit')).toBeTruthy();
    });
});

describe('File selection event', () => {
    let docParser, fileUpload;
    beforeEach(() => {
        docParser = getWrapper();
        fileUpload = docParser.findComponent(FileUpload);
    });
    it('check spinner appearance', async () => {
        const fileProcessingText = 'documentParser.fileProcessing';
        fileUpload.vm.$emit(SELECT_FILE_EVENT, CORRECT_FILE_CONTEXT);
        await waitSec(0.005);
        expect(docParser.text()).toContain(fileProcessingText);
        await waitSec(0.020);
        expect(docParser.text()).not.toContain(fileProcessingText);
    });
    it('while processing Upload button is hidden', async () => {
        const uploadButtonText = 'documentParser.buttons.upload';
        fileUpload.vm.$emit(SELECT_FILE_EVENT, CORRECT_FILE_CONTEXT);
        await waitSec(0.005);
        expect(docParser.text()).not.toContain(uploadButtonText);
        await waitSec(0.020);
        expect(docParser.text()).toContain(uploadButtonText);
    });
})

function getWrapper() {
    const globalConfig = {
        plugins: [PrimeVue, ToastService],
        components: {FileUpload, DataTable, Column, ProgressBar, Toast, RelationshipList},
        t: (key) => key
    };
    return mount(DocumentParser, {global: globalConfig});
}
async function waitSec(sec) {
    await new Promise(resolve => setTimeout(resolve, sec * 1000));
}

function mockLoadDataWithPost() {
    vi.mock('@/rest/utils', () => ({
        loadDataWithPost: async () => {
            await new Promise(resolve => setTimeout(resolve,  20));
        }
    }));
}

function findTextOnBody(text) {
    return document.querySelector('body').textContent.includes(text);
}