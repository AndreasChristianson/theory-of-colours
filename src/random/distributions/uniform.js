import { getRandom } from '../index.js';

export const getUniformIntGenerator = (
  min = 0,
  max = Number.MAX_SAFE_INTEGER
) => getRandom().uniformInt(min, max);

export const getUniformGenerator = (min = 0, max = Number.MAX_SAFE_INTEGER) =>
  getRandom().uniform(min, max);
