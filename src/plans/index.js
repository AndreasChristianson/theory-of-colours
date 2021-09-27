import Centered from './noise/Centered.js';
import NightSky from './noise/NightSky.js';
import Noise from './noise/Noise.js';

export default [
  { weight: 20, class: Noise, name: 'Noise' },
  { weight: 10, class: NightSky, name: 'NightSky' },
  { weight: 40, class: Centered, name: 'Centered' },
];
