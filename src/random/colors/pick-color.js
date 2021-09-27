import randomColor from 'randomcolor';
import tinycolor from 'tinycolor2';
import { getRandom, getUniformIntGenerator, pickPalette } from '../index.js';

export const generateRandomColor = () => {
  return tinycolor.fromRatio({
    r: getRandom().float(),
    g: getRandom().float(),
    b: getRandom().float(),
  });
};
export const addJitterToColor = (color, amount = 5) =>
  tinycolor.mix(color, generateRandomColor(), amount);
