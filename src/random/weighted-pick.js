import { getUniformIntGenerator } from './index.js';

const sumNumbers = (numbers) =>
  numbers.reduce((accumulator, number) => accumulator + number, 0);

export const weightedPick = (weights) => {
  const sum = sumNumbers(weights);
  let random = getUniformIntGenerator(0, sum)();
  for (let i = 0; weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return i;
    }
  }
};
