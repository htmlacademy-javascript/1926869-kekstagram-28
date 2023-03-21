import { data } from './create-post.js';

const addPosts = () => {

  const picturePlace = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const posts = data;

  const postFragment = document.createDocumentFragment();

  posts.forEach(({ url, likes, comments, description, id}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.dataset.id = id;

    postFragment.append(pictureElement);
  });

  picturePlace.append(postFragment);
};
export { addPosts };
