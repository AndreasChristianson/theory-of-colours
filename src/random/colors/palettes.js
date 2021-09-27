import nicePalettes from 'nice-color-palettes';
import { pick } from '../index.js';
const generatePalettes = () => ({
  fire: ['#801100', '#B62203', '#D73502', '#FC6400', '#FF7500', '#FAC000'],
});

export const pickRandomPalette = () => pick(nicePalettes);

export const pickPalette = (name) => {
  const selectedPalette = generatePalettes()[name];
  if (selectedPalette) {
    return selectedPalette;
  }
  return pickRandomPalette();
};
