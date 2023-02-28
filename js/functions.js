const isStringLength = (string, number) => string.length === number;
isStringLength('проверяемая строка', 18);

const isPalindrome = (string) => {
  string = string.toLowerCase().split(' ').join('');
  if (string.length === 1) {
    return true;
  }

  const newString = string.split('').reverse().join('');
  return string === newString;
};
isPalindrome('Лёша на полке клопа нашёл ');

const getNewString = (origin, len, addStr) => {
  while (origin.length < len) {
    if (addStr.length + origin.length > len) {
      addStr = addStr.slice(0, len - origin.length);
    }
    origin = addStr + origin;
  }
  return origin;
};
getNewString('q', 4, 'we');
