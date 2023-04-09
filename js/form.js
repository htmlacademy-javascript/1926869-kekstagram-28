import { isEscapeKey } from './util.js';
import { validateForm, resetInputForm } from './validate.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { createSuccessMessage } from './fetch-message.js';
import { loadImg } from './img-preview.js';

const uploadSelectImage = document.querySelector('#upload-select-image');
const uploadFile = uploadSelectImage.querySelector('#upload-file');
const imgUploadOverlay = uploadSelectImage.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancel = uploadSelectImage.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');

let closeFormEscKeydown = undefined;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormEscKeydown);
  imgUploadCancel.removeEventListener('click', closeForm);
  uploadSelectImage.removeEventListener('submit', validateForm);
  resetScale();
  resetEffects();
};

const onSuccess = () => {
  closeForm();
  resetInputForm();
  createSuccessMessage();
};

closeFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeForm();
  }
};


const submitForm = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  if (validateForm) {
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(onSuccess())
      .finally(unBlockSubmitButton());
  }
};

const openForm = () => {

  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', closeFormEscKeydown);
  imgUploadCancel.addEventListener('click', closeForm);
  uploadSelectImage.addEventListener('submit', validateForm);
  resetScale();
  resetEffects();
};

const onUploadPhotoChange = (evt) => {
  evt.preventDefault();
  openForm();
};

const loadPhoto = () => {
  uploadFile.addEventListener('change', (evt) => {
    onUploadPhotoChange(evt);
    loadImg (evt);
  });
  uploadSelectImage.addEventListener('submit', submitForm);
};


export { loadPhoto };
