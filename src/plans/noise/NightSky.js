import Noise from './Noise.js';
import { addJitterToColor } from '../../random/colors/pick-color.js';
import { getUniformIntGenerator } from '../../random/index.js';
import { generateSvgBuilder } from '../plan-utils.js';

class NightSky extends Noise {
  constructor(options) {
    super({
      backgroundColor: addJitterToColor('black').toString(),
      count: getUniformIntGenerator(2000, 3000)(),
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
      ...options,
    });
  }

  buildSvg = generateSvgBuilder((options) => [
    {
      tag: 'rect',
      attributes: {
        fill: options.backgroundColor,
        width: '100%',
        height: '100%',
      },
    },
    ...this.generateNoise(options),
  ]);
}

export default NightSky;
