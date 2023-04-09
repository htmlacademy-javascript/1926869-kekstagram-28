const FILE_TYPES = ['png', 'jpeg', 'webp', 'jpg'];

const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const loadImg = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((format) => fileName.endsWith(format));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${preview.src})`;
    });
  }
};

export { loadImg };
