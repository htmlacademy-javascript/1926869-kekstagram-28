import { createPost } from './create-post.js';

const addPosts = (picture) => {

  const picturePlace = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const posts = createPost();

  const postFragment = document.createDocumentFragment();

  posts.forEach(({ url, likes, comments, description }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;

    postFragment.append(pictureElement);
  });

  picturePlace.append(postFragment);
}
export { addPosts };
