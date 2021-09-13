import { getRandom } from './index.js';

const STD_DEV_RANGE = 4;

export const getGaussianGenerator = (center = 0, stddev = 1) => {
  return getRandom().normal(center, stddev);
};

export const getTruncatedGaussianGenerator = (
  center,
  stddev,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => {
  if (max - min < stddev) {
    throw new Error('Truncate range too narrow');
  }
  if (min - center > stddev * STD_DEV_RANGE) {
    throw new Error('Min to far away from center');
  }
  if (center - max > stddev * STD_DEV_RANGE) {
    throw new Error('Max to far away from center');
  }
  const generator = getGaussianGenerator(center, stddev);
  return () => {
    let result;
    do {
      result = generator();
    } while (min > result || max < result);
    return result;
  };
};
