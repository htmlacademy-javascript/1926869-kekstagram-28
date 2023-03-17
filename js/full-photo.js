import { commentsArray } from './create-post.js';
import { renderComments } from './comments.js';
import { getRandomInteger } from './util.js';
import { DESCRIPTIONS } from './create-post.js';
import { isEscapeKey } from './util.js';


export const interactWithBigPicture = () => {
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  const containerPhoto = document.querySelector('.pictures');
  const bitPicture = document.querySelector('.big-picture');
  const bigPictureImg = bitPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bitPicture.querySelector('.likes-count');
  const bigPictureComments = bitPicture.querySelector('.comments-count');
  const bigPictureDescriptions = bitPicture.querySelector('.social__caption');
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  const body = document.querySelector('body');

  const onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  containerPhoto.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      bitPicture.classList.remove('hidden');

      bigPictureImg.src = evt.target.closest('.picture').querySelector('img').src;
      bigPictureLikes.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
      bigPictureComments.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;
      bigPictureDescriptions.textContent = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      body.classList.add('modal-open');
      renderComments(commentsArray);
    }
    document.addEventListener('keydown', onBigPictureEscKeydown);
  });

  function closeBigPicture() {
    bitPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }

  bigPictureClose.addEventListener('click', closeBigPicture);
};
