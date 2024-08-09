import axios from 'axios';
import configureStore from '../store';

export const GetRecord = (url, data) => {
  return axios({
    method: 'POST',
    crossDomain: true,
    dataType: 'application/json; charset=utf-8',
    data,
    url: url,
  });
};

export const SocialLogin = (url, data) => {
  let config = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  return axios.request(config)
};

export const fetchRecord = async url => {
  const store = configureStore();
  let dataset = store.getState();
  let token = await dataset.AuthReducer.accessToken;
  return axios({
    method: 'GET',
    crossDomain: true,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const fetchRecordWithoutToken = async url => {
  return axios({
    method: 'GET',
    crossDomain: true,
    url: url,
  });
};

export const postApi = async (url, data) => {

  const store = configureStore();
  let dataset = store.getState();
  let token = await dataset.AuthReducer.accessToken;
  if (token) {
    return axios({
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: { count: data.count.payload },
      url: url,
    });
  }
};

export const registerApi = async (url, data) => {
  const store = configureStore();
  let dataset = store.getState();
  let token = await dataset.AuthReducer.accessToken;
  if (token) {
    return axios({
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
      url: url,
    });
  }
};
