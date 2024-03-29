import { createComments } from './comments.js';

const STEP_SHOW_COMMENTS = 5;
const bigPictureClose = document.querySelector('.big-picture__cancel');
const containerPhoto = document.querySelector('.pictures');
const bitPicture = document.querySelector('.big-picture');
const bigPictureImg = bitPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bitPicture.querySelector('.likes-count');
const bigPictureComments = bitPicture.querySelector('.comments-count');
const visibleCommentsCount = document.querySelector('.visible-comments-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const bigPictureDescriptions = bitPicture.querySelector('.social__caption');
let startSliceComments = 0;
let finishSliceComments = 5;

const onCloseBigPicture = (fn = null) => {
  bitPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  startSliceComments = 0;
  finishSliceComments = 5;
  commentsLoader.removeEventListener('click', fn);
};

const renderComments = (array) => {
  if (array.length <= finishSliceComments) {
    visibleCommentsCount.textContent = array.length;
    commentsLoader.classList.add('hidden');
    return createComments(array);
  }
  visibleCommentsCount.textContent = finishSliceComments;
  commentsLoader.classList.remove('hidden');
  return createComments(array.slice(startSliceComments, finishSliceComments));
};

export const interactWithBigPicture = (data) => {

  const openWindowFullPhoto = (evt) => {
    const evtClosestPicture = evt.target.closest('.picture');
    if (evtClosestPicture) {
      const target = evt.target.closest('.picture');
      const currentDescription = data.find((item) => item.id === Number(target.dataset.id));

      bitPicture.classList.remove('hidden');
      bigPictureImg.src = currentDescription.url;
      bigPictureLikes.textContent = currentDescription.likes;
      bigPictureComments.textContent = currentDescription.comments.length;
      bigPictureDescriptions.textContent = currentDescription.descriptions;
      document.body.classList.add('modal-open');
      const arrayElem = currentDescription.comments;
      renderComments(arrayElem);
      const onStepRenderComments = () => {
        finishSliceComments += STEP_SHOW_COMMENTS;
        renderComments(arrayElem);
      };
      commentsLoader.addEventListener('click', onStepRenderComments);
      bigPictureClose.addEventListener('click', () => {
        onCloseBigPicture(onStepRenderComments);
      });
    }

  };

  containerPhoto.addEventListener('click', openWindowFullPhoto);

};
