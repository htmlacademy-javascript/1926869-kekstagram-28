const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const formUpload = document.querySelector('#upload-select-image');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const hastegValidateSymbols = /^#[a-zа-яё0-9]{1,19}$/;

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateHashtags = (symbol) => {
  const hashtagsLower = symbol.toLowerCase();
  const hashtags = hashtagsLower.split(' ');
  const uniqueHashtags = [...new Set(hashtags)];
  if (symbol === '') {
    return true;
  }

  for (const hashtag of hashtags) {
    if (!hastegValidateSymbols.test(hashtag)) {
      return false;
    }
  }
  return hashtags.length <= MAX_HASHTAGS_COUNT && hashtags.length === uniqueHashtags.length;
};

const validateDescriptions = (description) => description.length <= MAX_DESCRIPTION_LENGTH;


const validateForm = (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
};

pristine.addValidator(
  textHashtag,
  validateHashtags,
  `Хэш-тег начинается с символа #. Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов. Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`
);

pristine.addValidator(
  textDescription,
  validateDescriptions,
  `Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов`
);

export { validateForm };
