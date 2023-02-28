const isStringLength = (string, number) => string.length === number;
console.log(isStringLength('проверка', 8));




const isPalindrome = (string) => {
  string = string.toLowerCase().split(' ').join('');
  if (string.length === 1) {
    return true;
  }

  const newString = string.split('').reverse().join('');
  return string === newString;
};
console.log(isPalindrome('aBcd D cb a'));





const isCrunch = (data) => typeof data === 'number' ? data : data.replace(/\D/g,'');
console.log(isCrunch(1233));
console.log(isCrunch('Пр123и вет123'))





const getNewString = (origin, len, addStr) => {
  while (origin.length < len) {
    if (addStr.length + origin.length > len) {
      addStr = addStr.slice(0, len - origin.length);
    }
    origin = addStr + origin;
  }
  return origin;
};

console.log(getNewString('q', 4, 'we'));