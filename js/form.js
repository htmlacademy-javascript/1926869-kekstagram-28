import {isEscapeKey} from './util.js';
import { validateForm } from './validate.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const uploadSelectImage = document.querySelector('#upload-select-image');
const uploadFile = uploadSelectImage.querySelector('#upload-file');
const imgUploadOverlay = uploadSelectImage.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancel = uploadSelectImage.querySelector('.img-upload__cancel');

let closeFormEscKeydown = undefined;

// ----
// imgUploadOverlay.classList.remove('hidden');

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormEscKeydown);
  imgUploadCancel.removeEventListener('click', closeForm);
  uploadSelectImage.removeEventListener('submit', validateForm);
  resetScale();
  resetEffects();
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
uploadFile.addEventListener('change', openForm);


closeFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeForm();
  }
};
