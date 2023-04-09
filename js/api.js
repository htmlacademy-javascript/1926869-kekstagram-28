import { showAlert } from './util.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const ErrorMessage = {
  GET_ERROR_MESSAGE: 'Не удалось загрузить данные. Пожалуйста, обновите страницу.',
  SEND_ERROR_MESSAGE: 'Не удалось отправить форму. Попробуйте ещё раз.'
};

const methodApi = {
  POST: 'POST',
  GET: 'GET'
};
const pathApi = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const load = (path, errorMessage, method = 'GET', body = null) =>
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


const getData = () => load(pathApi.GET_DATA, ErrorMessage.GET_ERROR_MESSAGE);

const sendData = (body) => load(pathApi.SEND_DATA, ErrorMessage.SEND_ERROR_MESSAGE, methodApi.POST, body);

export { getData, sendData };

