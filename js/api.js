import { showAlert } from './util.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const errorMessage = 'Не удалось загрузить изображение. Проверьте правильность заполнения полей и обновите страницу.';
const methodApi = {
  POST: 'POST',
  GET: 'GET'
};
const pathApi = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const load = (path, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${path}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(showAlert(errorMessage));
    });


const getData = () => load(pathApi.GET_DATA);

const sendData = (body) => load(pathApi.SEND_DATA, methodApi.POST, body);

export { getData, sendData };

