function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
  if (typeof str !== 'string') return '';
  return str.split('').reverse().join('');
}

function countVowels(str) {
  if (typeof str !== 'string') return 0;
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

module.exports = {
  capitalize,
  reverse,
  countVowels
};
