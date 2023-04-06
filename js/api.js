const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const errorMessage = 'Не удалось загрузить данные. Пожалуйста, обновите страницу.';
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
      throw new Error(errorMessage);
    });


const getData = () => load(pathApi.GET_DATA);

const sendData = (body) => load(pathApi.SEND_DATA, methodApi.POST, body);

export { getData, sendData };

