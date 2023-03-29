const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chooseEffect = DEFAULT_EFFECT;
const isDefault = () => chooseEffect === DEFAULT_EFFECT;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const levelSlider = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level ');

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: chooseEffect.min,
      max: chooseEffect.max
    },
    start: chooseEffect.max,
    step: chooseEffect.step
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = levelSlider.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chooseEffect.style}(${sliderValue}${chooseEffect.unit})`;
};

const resetEffects = () => {
  chooseEffect = DEFAULT_EFFECT;
  updateSlider();
};

// noUiSlider.create(levelSlider, {
//   range: {
//     min: DEFAULT_EFFECT.min,
//     max: DEFAULT_EFFECT.max,
//   },
//   start: DEFAULT_EFFECT.max,
//   step: DEFAULT_EFFECT.step,
//   connect: 'lower',
// });

noUiSlider.create(levelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
});


const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    chooseEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    imageElement.className = `effects__preview--${chooseEffect.name}`;
    updateSlider();
  }
};

hideSlider();

levelSlider.addEventListener('update', onSliderUpdate);
effectsElement.addEventListener('change', onEffectsChange);

export {resetEffects};
