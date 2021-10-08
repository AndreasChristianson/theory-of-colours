import log from 'npmlog';
import {
  getTruncatedGaussianGenerator,
  getUniformGenerator,
  getUniformIntGenerator,
  pick,
} from '../../random/index.js';
import { generateSvgBuilder } from '../plan-utils.js';
import Noise from './Noise.js';

const calculateDistance = (point1, point2) =>
  Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);

const scaleLinearly = ({
  value,
  measurement,
  inflectionPoint = 0.5,
  minMeasurement = 0,
  maxMeasurement = 1,
  maxScaleUp = 2,
  maxScaleDown = 0,
  direction = 1,
  scaleAtInflection = 1,
}) => {
  const normalizedMeasurement = Math.min(
    maxMeasurement,
    Math.max(minMeasurement, measurement)
  );
  let scaleFactor;
  if (normalizedMeasurement > inflectionPoint) {
    scaleFactor =
      ((normalizedMeasurement - inflectionPoint) /
        (maxMeasurement - inflectionPoint)) *
        (maxScaleUp - scaleAtInflection) +
      scaleAtInflection;
  } else {
    scaleFactor =
      ((normalizedMeasurement - minMeasurement) /
        (inflectionPoint - minMeasurement)) *
        (scaleAtInflection - maxScaleDown) +
      maxScaleDown;
  }

  return value * scaleFactor ** direction;
};

class Centered extends Noise {
  constructor(options) {
    super({
      attributeToScale: pick(['opacity', 'r']),
      scaleDirection: 1,
      maxScaleUp: getUniformGenerator(2, 5)(),
      count: getUniformIntGenerator(1000, 2000)(),
      radius: {
        type: 'normal',
        min: 1,
        max: 200,
        center: 40,
        stddev: 10,
      },
      inflectionDistance: getTruncatedGaussianGenerator(400, 100, 10, 1000)(),
      ...options,
    });
  }

  generateScaledNoise = (options) => {
    const elements = this.generateNoise(options);
    const maxMeasurement = calculateDistance(options.center, { x: 0, y: 0 });

    return elements.map((element) => {
      const oldValue = element.attributes[options.attributeToScale];
      const position = {
        x: element.attributes.cx,
        y: element.attributes.cy,
      };
      const distance = calculateDistance(options.center, position);
      const newValue = scaleLinearly({
        value: oldValue,
        measurement: distance,
        inflectionPoint: options.inflectionDistance,
        minMeasurement: 0,
        maxMeasurement,
        direction: options.scaleDirection,
        maxScaleUp: options.maxScaleUp,
      });
      return {
        ...element,
        attributes: {
          ...element.attributes,
          [options.attributeToScale]: newValue,
        },
      };
    });
  };

  buildSvg = generateSvgBuilder(this.generateScaledNoise);
}

export default Centered;
