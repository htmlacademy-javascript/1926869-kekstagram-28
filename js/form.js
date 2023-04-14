import { isEscapeKey } from './util.js';
import { onValidateForm, resetInputForm } from './validate.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { createSuccessMessage, createErrorMessage } from './fetch-message.js';
import { loadImg } from './img-preview.js';

const uploadSelectImage = document.querySelector('#upload-select-image');
const uploadFile = uploadSelectImage.querySelector('#upload-file');
const imgUploadOverlay = uploadSelectImage.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancel = uploadSelectImage.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');

let onKeydownEsc = undefined;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onCloseForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeydownEsc);
  imgUploadCancel.removeEventListener('click', onCloseForm);
  uploadSelectImage.removeEventListener('submit', onValidateForm);
  resetScale();
  resetEffects();
};

const onSuccess = () => {
  onCloseForm();
  resetInputForm();
  createSuccessMessage();
  unBlockSubmitButton();
};

onKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    onCloseForm();
  }
};


const submitForm = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  if (onValidateForm()) {
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(onSuccess)
      .catch(createErrorMessage)
      .finally(unBlockSubmitButton());
  }
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onKeydownEsc);
  imgUploadCancel.addEventListener('click', onCloseForm);
  uploadSelectImage.addEventListener('submit', onValidateForm);
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
