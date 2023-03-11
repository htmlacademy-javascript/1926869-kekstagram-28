import {getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUUNT = 2;

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

const generateIdPhoto = createRandomIdFromRangeGenerator(1, PICTURE_COUNT);
const generateIdcomment = createRandomIdFromRangeGenerator(1, 54321);


const createCommenter = () => ({
  id: generateIdcomment(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPhotoContent = () => {
  const createProfile = {
    id: generateIdPhoto(),
    url: `photos/${getRandomInteger(1, PICTURE_COUNT)}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from({ length: COMMENT_COUUNT }, createCommenter)
  };
  return createProfile;
};

const createPost = () => Array.from({ length: PICTURE_COUNT }, createPhotoContent);
export {createPost};
