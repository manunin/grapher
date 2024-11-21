import apiClient from './apiClient';

function loadDataWithFormData(url, formData, options = {}) {
    return apiClient.post(url, formData, options).then((resp) => {
        return resp ? resp.data : null;
    }).catch((err) => {
        if (needLogError(err)) {
        console.error(`Unable to load data from ${url} : ${err}`);
        }
        throw err;
    })
}

function loadData(url, options = {}) {
  return apiClient.get(url, options).then((resp) => {
    return resp ? resp.data : null;
  }).catch((err) => {
    if (needLogError(err)) {
      console.error(`Unable to load data from ${url} : ${err}`);
    }
    throw err;
  })
}

function loadDataWithPost(url, options = {}) {
  return apiClient.post(url, options).then((resp) => {
    return resp ? resp.data : null;
  }).catch((err) => {
    if (needLogError(err)) {
      console.error(`Unable to load data from ${url} : ${err}`);
    }
    throw err;
  })
}

function putData(url, data = {}, options = {}) {
  return apiClient.put(url, data, options).catch((err) => {
    if (needLogError(err)) {
      console.error(`Unable to put data to ${url} : ${err}`);
    }
    throw err;
  })
}

function deleteData(url, options = {}) {
  return apiClient.delete(url, options).catch((err) => {
    if (needLogError(err)) {
      console.error(`Unable to delete data from ${url} : ${err}`);
    }
    throw err;
  })
}

function postData(url, data = {}, options = {}) {
  return apiClient.post(url, data, options).catch((err) => {
    if (needLogError(err)) {
      console.error(`Unable to post data to ${url} : ${err}`);
    }
    throw err;
  })
}

function needLogError(err) {
  return err.response == null || err.response.status !== 422;
}

export {loadData, loadDataWithPost, postData, putData, deleteData};
