import random from 'random';
import seedRandom from 'seedrandom';

import { getOptions } from '../options/arguments.js';

export { pick } from './pick.js';
export { getUniformGenerator, getUniformIntGenerator } from './uniform.js';
export {
  getGaussianGenerator,
  getTruncatedGaussianGenerator,
} from './gaussian.js';

let seededRandom;

export const setupSeed = (seed = getOptions().seed) => {
  seededRandom = random.clone(seedRandom(seed));
};
export const getRandom = () => {
  return seededRandom;
};
