import { getRandom } from '../index.js';

export const getUniformIntGenerator = (min, max) => {
  return getRandom().uniformInt(min, max);
};

export const getUniformGenerator = (min, max) => {
  return getRandom().uniform(min, max);
};
