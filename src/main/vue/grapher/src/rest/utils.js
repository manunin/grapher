import apiClient from './apiClient';
import ToastEventBus from 'primevue/toasteventbus';

const loadData = (url, options = {}) => {
  return apiClient.get(url, options)
      .then(processResponse(url))
      .catch((err) => {
        showError(err, url);
        throw err;
      })
}

const loadDataWithPost = (url, options = {}) => {
  return apiClient.post(url, options)
      .then(processResponse(url))
      .catch((err) => {
        showError(err, url);
        throw err;
      })
}

const putData = (url, data = {}, options = {}) => {
  return apiClient.put(url, data, options)
      .then(processResponse(url))
      .catch((err) => {
        showError(err, url);
        throw err;
      })
}

const deleteData = (url, options = {}) => {
  return apiClient.delete(url, options)
      .then(processResponse(url))
      .catch((err) => {
        showError(err, url);
        throw err;
      })
}

const postData = (url, data = {}, options = {}) => {
  return apiClient.post(url, data, options)
      .then(processResponse(url))
      .catch((err) => {
        showError(err, url);
        throw err;
      })
}


const processResponse = (url) => {
  return (resp) => {
    if (resp.status !== 200) {
      showError(resp, url);
      return null;
    }
    showSuccess();
    return resp ? resp.data : null;
  };
}

const showSuccess = () => {
  ToastEventBus.emit('add', {severity: 'success', summary: 'Success', detail: 'Data loaded'});
}

const showError = (resp, url) => {
  const summary = resp.data.error.summary || 'Error';
  const details = resp.data.error.details || resp;
  ToastEventBus.emit('add', {severity: 'error', summary: summary, detail: details});
  console.error(`Unable to load data from ${url} : ${resp.data.error}`);
}

export {loadData, loadDataWithPost, postData, putData, deleteData};
