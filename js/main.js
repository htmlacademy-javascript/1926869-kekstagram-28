import { addPosts } from './picture.js';
import { interactWithBigPicture } from './full-photo.js';
import { getData } from './api.js';
import { initFilter } from './filter.js';
import { loadPhoto } from './form.js';
import './effects.js';
getData()
  .then((response) => {
    addPosts(response);
    initFilter(response);
    interactWithBigPicture(response);
  });

loadPhoto();
