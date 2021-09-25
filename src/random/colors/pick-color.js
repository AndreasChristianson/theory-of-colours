import randomColor from 'randomcolor';
import tinycolor from 'tinycolor2';
import { getRandom, getUniformIntGenerator, pickPalette } from '../index.js';

const random = () => {
  return tinycolor.fromRatio({
    r: getRandom().float(),
    g: getRandom().float(),
    b: getRandom().float(),
  });
};
const addJitter = (color, amount = 5) => tinycolor.mix(color, random(), amount);

export const pickColor = (arg) => {
  const sanitized =
    typeof arg == 'string'
      ? {
          type: 'exact',
          color: arg,
        }
      : arg;
  const { type, ...params } = sanitized;

  switch (type) {
    case 'exact':
      return () => params.color;
    case 'near':
      return () => addJitter(params.color, params.jitter || 15);
    case 'palette':
      return pickPalette(params.palette);
    case 'contrast':
      const contrast = tinycolor(params.color).complement();
      return () => contrast;
    case 'random':
    default:
      const seeder = getUniformIntGenerator(
        Number.MIN_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER
      );
      return () =>
        randomColor({
          seed: seeder(),
          ...params,
        });
  }
};
