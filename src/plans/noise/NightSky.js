import { getOptions } from '../../options/arguments.js';
import Noise from './Noise.js';

export default class extends Noise {
  getPlanOptions() {
    return {
      ...super.getPlanOptions(),
      foregroundColor: {
        type: 'random',
        luminosity: 'light',
      },
      count: 3000,
      radius: {
        type: 'normal',
        min: 0,
        max: 2,
        center: 0.1,
        stddev: 0.25,
      },
      opacity: {
        type: 'uniform',
        min: 0.9,
        max: 1.0,
      },
      ...getOptions(),
    };
  }
}
