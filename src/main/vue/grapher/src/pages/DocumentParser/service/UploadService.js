import {loadDataWithPost} from '@/rest/utils';

class UploadService {
    static instance = null;

    uploadFile(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({status: 200});
            }, 2000);
        });
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return new UploadServiceImpl();
    }
}

class UploadServiceImpl extends UploadService {
    uploadFile(formData) {
        return loadDataWithPost('/file/upload', formData);
    }
}

export default UploadService;