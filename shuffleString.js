/*
 * @param string { String } a string of characters
 * @param iterations { Number } number of times to iterate string
 * @param separator { String } optional separator between strings
 * @param lineLength { Number } optional line length
 * @param shuffle { Boolean } optional shuffle spaces. spaces swap spaces characters with neighbors
 * @returns { String } iteration count of input string with characters shuffled
 */

import {jumbleCharacters, swapSpaces, getPossibleIterationCount, formatNumber} from './helpers.js';
const args = process.argv.slice(2);
const [string, iterations, separator, lineLength, shuffle] = args;


if (!string || !iterations) {
  console.info(`Usage: node iterateString.js <string> <iterations> <separator> <lineLength>`);
  console.error('Please provide a string and number of iterations');
  process.exit(1);
}

const outputExecInfo = (string, iterations, separator, lineLength, shuffle) => {
  const hasLineLength = lineLength ? true : false;
  const hasSeparator = separator && separator !== '' ? true : false;
  const possibleIterations = getPossibleIterationCount(string);
  const possibleIterationsForHumans = formatNumber(possibleIterations);

  let parsedSeparator = separator;
  if (separator.trim() === "") {
    parsedSeparator = separator.length > 1 ? "multiple spaces" : "space";
  }

  console.group('Execution Info');
  const info = `
    String: ${string}
    Iterations: ${iterations}
    Line length: ${hasLineLength ? lineLength : "N/A"}
    Word separator: ${hasSeparator ? parsedSeparator : "N/A"}
    Characters in string: ${string.length}
    Possible combinations: ${possibleIterationsForHumans}
    Shuffle spaces: ${shuffle ?? 'No'}
  `;

  console.info(info);
  console.groupEnd();
}

const iterateString = (string, iterations, separator = '', lineLength = 0) => {
  let output = '';

  for (let i = 0; i < iterations; i++) {
    output += jumbleCharacters(string);
    if (separator) {
      output += separator;
    }
  }

  if (lineLength) {
    output = output.match(new RegExp(`.{1,${lineLength}}`, 'g')).join('\n');
  }
  return output;
}

outputExecInfo(string, iterations, separator, lineLength, shuffle);
const result = iterateString(string, iterations, separator, lineLength);
console.info(shuffle ? swapSpaces(result) : result);
