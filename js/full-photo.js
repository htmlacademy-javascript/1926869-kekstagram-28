import { renderComments } from './comments.js';
import { data } from './create-post.js';
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
  let onBigPictureEscKeydown = undefined;

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


  containerPhoto.addEventListener('click', (evt) => {
    const evtClosestPicture = evt.target.closest('.picture');
    if (evtClosestPicture) {
      const target = evt.target.closest('.picture');
      const currentDescription = data.find((item) => item.id === Number(target.dataset.id));
      bitPicture.classList.remove('hidden');
      bigPictureImg.src = currentDescription.url;
      bigPictureLikes.textContent = currentDescription.likes;
      bigPictureComments.textContent = currentDescription.comments.length;
      bigPictureDescriptions.textContent = currentDescription.descriptions;
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      body.classList.add('modal-open');
      renderComments(currentDescription.comments);
    }
    document.addEventListener('keydown', onBigPictureEscKeydown);
  });

  bigPictureClose.addEventListener('click', closeBigPicture);
};
