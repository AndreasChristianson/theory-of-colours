import log from 'npmlog';
import { writeToStream } from '../files/index.js';
import pack from '../../package.json';

const isIterable = (value) => typeof value!=="string"&& Symbol.iterator in Object(value);

const objectToAttributes = (object, separator = ' ') =>
  Object.entries(object)
    .map(([key, value]) => [key, isIterable(value) ? value.join('\n') : value])
    .map(([key, value]) => `${key}="${value}"`)
    .join(separator);

const writeElement = async (element) => {
  const attributes = objectToAttributes(element.attributes);
  if (!element.content) {
    await writeToStream(`<${element.tag} ${attributes}/>`);
  } else {
    await writeToStream(
      `<${element.tag} ${attributes}>${element.content}</${element.tag}>`
    );
  }
};
export const generateSvgBuilder =
  (elementGenerator, attributeOverrides = {}) =>
  async (options) => {
    const attributes = {
      width: options.width,
      height: options.height,
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
      ...attributeOverrides,
    };
    await writeToStream(`<svg ${objectToAttributes(attributes)} >`);
    await writeToStream(
      `<!-- created with https://github.com/AndreasChristianson/theory-of-colours version ${pack.version}`
    );
    await writeToStream(objectToAttributes(options, '\n'));
    await writeToStream(`-->`);

    const elements = await elementGenerator(options);
    for (const element of elements) {
      await writeElement(element);
    }

    await writeToStream('</svg>');
  };
