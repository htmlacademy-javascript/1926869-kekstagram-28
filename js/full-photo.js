import { createComments } from './comments.js';
import { data } from './create-post.js';
import { isEscapeKey } from './util.js';

export const interactWithBigPicture = () => {
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
  let START_SLICE_COMMENTS = 0;
  let FINISH_SLICE_COMMENTS = 5;

  const renderComments = (array) => {
    if (array.length <= FINISH_SLICE_COMMENTS) {
      visibleCommentsCount.textContent = array.length;
      commentsLoader.classList.add('hidden');
      return createComments(array);
    }
    visibleCommentsCount.textContent = FINISH_SLICE_COMMENTS;
    return createComments(array.slice(START_SLICE_COMMENTS, FINISH_SLICE_COMMENTS));
  };

  const closeBigPicture = () => {
    bitPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  const fullPhoto = (evt) => {
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

      commentsLoader.addEventListener('click', () => {
        START_SLICE_COMMENTS += STEP_SHOW_COMMENTS;
        FINISH_SLICE_COMMENTS += STEP_SHOW_COMMENTS;
        // вот тут после клика мне нужно вызвать ещё раз renderComments
        renderComments(arrayElem);
        // -----------------------------------------------------
      });
    }
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  containerPhoto.addEventListener('click', fullPhoto);


  bigPictureClose.addEventListener('click', closeBigPicture);
};
