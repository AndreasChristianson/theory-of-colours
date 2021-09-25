import {
  getTruncatedGaussianGenerator,
  getUniformGenerator,
} from '../index.js';

export const pickDistribution = (arg) => {
  const { type, min, max, center, stddev } = arg;

  switch (type.toLowerCase()) {
    case 'normal':
    case 'gaussian':
      return getTruncatedGaussianGenerator(center, stddev, min, max);
    case 'constant':
      return () => center;
    case 'uniform':
    default:
      return getUniformGenerator(min, max);
  }
};
