export const jumbleCharacters = (string) => {
  let jumbled;
  do {
    jumbled = string.split('').sort(() => Math.random() - 0.5).join('');
  } while (jumbled.startsWith(' ') || jumbled.endsWith(' '))
  return jumbled;
}

export const rotateString = (string, rotation) => {
  const rotated = string.split('').map(char => {
    const code = char.charCodeAt(0);
    const isUpperCase = code >= 65 && code <= 90;
    const isLowerCase = code >= 97 && code <= 122;
    const isLetter = isUpperCase || isLowerCase;
    if (!isLetter) {
      return char;
    }

    const offset = isUpperCase ? 65 : 97;
    const rotatedCode = ((code - offset + rotation) % 26 + 26) % 26 + offset;
    return String.fromCharCode(rotatedCode);
  }).join('');
  return rotated;
}

export function arrayShuffle(inputArray) {
  const array = inputArray.slice();
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const swapSpaces = (string) => {
  const chars = string.split('');
  const length = chars.length;

  for (let i = 0; i < length; i++) {
    if (chars[i] === ' ') {
      let swapRnd = Math.random();
      const swapDirection = swapRnd < 0.4
        ? -1
        : (swapRnd > 0.6 ? 1 : 0);
      const swapIndex = i + swapDirection;
      if (swapIndex >= 0 && swapIndex < length && chars[swapIndex] !== ' ') {
        // Swap the space with the neighbor
        [chars[i], chars[swapIndex]] = [chars[swapIndex], chars[i]];
      }
    }
  }

  return chars.join('').replace('  ', ' ');
}


export const getPossibleIterationCount = (string) => {
  const totalForString = Math.pow(string.length, string.length);
  return totalForString;
}

export const formatNumber = (num) => {
  if (num < 1000) return num.toString();
  // returns a human readable number
  const units = ['K', 'M', 'B', 'T', 'Q'];
  if (num >= 1_000_000_000_000_000) return num.toExponential(2);
  let unitIndex = 0;
  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }
  return `${num.toFixed(1)}${units[unitIndex]}`;
}
