import {isEscapeKey} from './util.js';
import { validateForm } from './validate.js';

const uploadSelectImage = document.querySelector('#upload-select-image');
const uploadFile = uploadSelectImage.querySelector('#upload-file');
const imgUploadOverlay = uploadSelectImage.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancel = uploadSelectImage.querySelector('.img-upload__cancel');

let closeFormEscKeydown = undefined;

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormEscKeydown);
  imgUploadCancel.removeEventListener('click', closeForm);
  uploadSelectImage.removeEventListener('submit', validateForm);
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', closeFormEscKeydown);
  imgUploadCancel.addEventListener('click', closeForm);
  uploadSelectImage.addEventListener('submit', validateForm);
};
uploadFile.addEventListener('change', openForm);


closeFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeForm();
  }
};
