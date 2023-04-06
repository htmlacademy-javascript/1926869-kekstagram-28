import { addPosts } from './picture.js';
import { interactWithBigPicture } from './full-photo.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './form.js';
import './effects.js';
getData()
  .then((response) => {
    addPosts(response);
    interactWithBigPicture(response);
  })
  .catch((err) => showAlert(err.message));

