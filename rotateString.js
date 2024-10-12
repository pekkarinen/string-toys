/*
 * Takes in a string, number of iterations, initial rotation value (default 13), optional rotation range, optional separator, optional line length
 * rotation function applies a Caesar cipher to the string. 
 * Possible rotation 
 * values are an array of numbers from rotation to rotation_rotation number, arrayShuffled ex. rotation 0, range 3, possible rotations [-3...3]
 * GET_POST,
 * 
 * ]} Returns a string of original string rotated number of iteration times with optional separator between strings and a new line every optional line length
 * @param string { String } a string of characters
 * @param iterations { Number } number of times to iterate string
 * @param rotation { Number } initial rotation value
 * @param range { Number } number of possible rotations
 * @param separator { String } optional separator between strings
 * @param lineLength { Number } optional line length
 * @param shuffle { Boolean } optional shuffle spaces
 * @returns { String } a string of original string jumbled number of iteration times with optional separator between strings and a new line every optional line length
 *
 * @example
 * iterateString('abc', 3, 1)
 * returns 'abcbaccba'
 *
 * @example
 * iterateString('abc', 3, ' ')
 * returns 'cab bca acb'
 *
 * @example
 * iterateString('abc', 6, ' ', 3)
 * returns 'cab bca acb\nbca cab acb'
 */

import {rotateString, swapSpaces, arrayShuffle} from './helpers.js';

const args = process.argv.slice(2);
const [string, iterations, rotation, range, separator, lineLength, shuffle] = args;

if (!string || !iterations || !rotation) {
  console.info(`Usage: node rotateString.js <string> <iterations> <rotations> <range> <separator> <lineLength>`);
  console.error('Please provide a string and number of iterations and rotation value');
  process.exit(1);
}


const outputExecInfo = (string, iterations, rotations, usedRotations, separator, lineLength, shuffle) => {
  const hasLineLength = lineLength ? true : false;
  const hasSeparator = separator && separator !== '' ? true : false;

  let parsedSeparator = separator;
  if (hasSeparator && separator.trim() === "") {
    parsedSeparator = separator.length > 1 ? "multiple spaces" : "space";
  }

  const usedRotationInfo = (usedRotations) => {
    /* outputs an rotation number and times used for console.table */
    const rotationInfo = {};
    rotations = Array.from(new Set(rotations)).sort((a, b) => a - b);
    rotations.forEach(rotation => {
      const count = usedRotations.filter(r => r === rotation).length;
      rotationInfo[rotation] = {count};
    });
    return rotationInfo;
  }

  console.group('Execution Info');
  const info = `Iterations (i): ${iterations}
  String: ${string}
  Line length: ${hasLineLength ? lineLength : "N/A"}
  Word separator: ${hasSeparator ? parsedSeparator : "N/A"}
  Shuffle spaces: ${shuffle ?? 'No'}
  `;

  console.info(info);
  console.info(`Rotations (r): 
   count: ${rotations.length}, 
   center: ${rotation}, 
   range: ${range}, 
  `)
  console.info(`r/i: ${rotations.length / iterations}\n`);
  console.info('Used Rotations');
  console.table(usedRotationInfo(usedRotations));
  console.groupEnd();
}

const iterateString = (string, iterations, rotations, separator = '', lineLength = 0) => {
  let output = '';
  let randomRotations = arrayShuffle(rotations);
  const usedRotations = []
  for (let i = 0; i < iterations; i++) {
    if (randomRotations.length === 0) randomRotations = arrayShuffle(rotations);
    const rotation = randomRotations.pop();
    const rotatedString = rotateString(string, rotation);
    usedRotations.push(rotation);
    output += rotatedString + separator;
  }

  if (lineLength) {
    output = output.match(new RegExp(`.{1,${lineLength}}`, 'g')).join('\n');
  }
  return [output, usedRotations];
}

let rotations
const rotationCount = range * 2
const min = (rotation - range);
rotations = rotationCount ? Array.from({length: rotationCount}, (_, i) => min + i) : [Number(rotation)];
const [result, usedRotations] = iterateString(string, iterations, rotations, separator, lineLength);
outputExecInfo(string, iterations, rotations, usedRotations, separator, lineLength, shuffle);
// console.info(result);
console.info(shuffle ? swapSpaces(result) : result);
