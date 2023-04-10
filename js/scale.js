const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_VALUE = 100;
const SCALE_STEP = 25;

const smaller = document.querySelector('.scale__control--smaller');
const bigger = document.querySelector('.scale__control--bigger');
const ScaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  ScaleValue.value = `${value}%`;
};

const onSmallerClick = () => {
  const currentValue = parseInt(ScaleValue.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE_VALUE) {
    newValue = MIN_SCALE_VALUE;
  }
  scaleImage(newValue);
};

const onBiggerClick = () => {
  const currentValue = parseInt(ScaleValue.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE_VALUE) {
    newValue = MAX_SCALE_VALUE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_VALUE);

smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);

export {resetScale};
