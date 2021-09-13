import { getUniformIntGenerator } from './index.js';

export const pick = (array) =>
  array[getUniformIntGenerator(0, array.length - 1)()];
