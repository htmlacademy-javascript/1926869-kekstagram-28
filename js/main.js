const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Виктор',
  'Маруся',
  'Артем',
  'Гендальф',
  'Покимон',
  'Чупа-чупс',
  'Шерлок',
  'Пьяный мужик',
  'Супермен'
];

const DESCRIPTIONS = [
  'Было весело',
  'Лето 2022',
  'На одной волне с космосом',
  'Что может быть лучше'
];

// Функция для генерации случайных целых чисел
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция для получения неповторяющихся чисел
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Создание ID для фото и комментов
const generateIdPhoto = createRandomIdFromRangeGenerator(1, 25);
const generateIdcomment = createRandomIdFromRangeGenerator(1, 54321);


const createCommenter = () => ({
  id: generateIdcomment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPhotoContent = () => {
  const createProfile = {
    id: generateIdPhoto(),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(0, 200),
    comments: Array.from({ length: 2 }, createCommenter)
  };
  return createProfile;
};

Array.from({ length: 25 }, createPhotoContent);
