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

const defaultEffect = EFFECTS[0];
let chooseEffect = defaultEffect;
const isDefault = () => chooseEffect === defaultEffect;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const levelSlider = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

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

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    chooseEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    imageElement.className = `effects__preview--${chooseEffect.name}`;
    updateSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = levelSlider.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? defaultEffect.style
    : `${chooseEffect.style}(${sliderValue}${chooseEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chooseEffect = defaultEffect;
  updateSlider();
};

noUiSlider.create(levelSlider, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower',
});

hideSlider();


levelSlider.noUiSlider.on('update', onSliderUpdate);
effectsElement.addEventListener('change', onEffectsChange);

export { resetEffects };
