import random from 'random';
import seedRandom from 'seedrandom';

import { getOptions } from '../options/arguments.js';

export { pick } from './pick.js';
export {
  getUniformGenerator,
  getUniformIntGenerator,
} from './distributions/uniform.js';
export {
  getGaussianGenerator,
  getTruncatedGaussianGenerator,
} from './distributions/gaussian.js';
export { pickDistribution } from './distributions/pick-distribution.js';
export { pickPalette } from './colors/palettes.js';
export { weightedPick } from './weighted-pick.js';

let seededRandom;

export const setupSeed = (seed = getOptions().seed) => {
  seededRandom = random.clone(seedRandom(seed));
  // seedRandom(seed, { global: true });
};
export const getRandom = () => {
  return seededRandom;
};
