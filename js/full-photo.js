import { createComments } from './comments.js';
import { isEscapeKey } from './util.js';

export const interactWithBigPicture = (data) => {
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  const containerPhoto = document.querySelector('.pictures');
  const bitPicture = document.querySelector('.big-picture');
  const bigPictureImg = bitPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bitPicture.querySelector('.likes-count');
  const bigPictureComments = bitPicture.querySelector('.comments-count');
  const visibleCommentsCount = document.querySelector('.visible-comments-count');
  const commentsLoader = document.querySelector('.social__comments-loader');
  const bigPictureDescriptions = bitPicture.querySelector('.social__caption');
  const body = document.querySelector('body');
  let onBigPictureEscKeydown = undefined;

  const STEP_SHOW_COMMENTS = 5;
  let startSliceComments = 0;
  let finishSliceComments = 5;

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


  const closeBigPicture = (fn = null) => {
    bitPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    startSliceComments = 0;
    finishSliceComments = 5;
    document.removeEventListener('keydown', onBigPictureEscKeydown);
    commentsLoader.removeEventListener('click', fn);
  };

  onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

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
      body.classList.add('modal-open');
      const arrayElem = currentDescription.comments;
      renderComments(arrayElem);
      const stepRenderComments = () => {
        finishSliceComments += STEP_SHOW_COMMENTS;
        renderComments(arrayElem);
      };
      commentsLoader.addEventListener('click', stepRenderComments);
      bigPictureClose.addEventListener('click', () => {
        closeBigPicture(stepRenderComments);
      });
    }
    document.addEventListener('keydown', onBigPictureEscKeydown);

  };

  containerPhoto.addEventListener('click', openWindowFullPhoto);

};
