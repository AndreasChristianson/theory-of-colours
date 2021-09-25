import log from 'npmlog';
import { writeToStream } from '../files/index.js';
import { getOptions } from '../options/arguments.js';

export const writeElement = async (element) => {
  const attributes = Object.entries(element.attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  if (!element.content) {
    await writeToStream(`<${element.tag} ${attributes}/>`);
  } else {
    await writeToStream(
      `<${element.tag} ${attributes}>${element.content}</${element.tag}>`
    );
  }
};

export const buildBackground = (color) => ({
  tag: 'rect',
  attributes: {
    fill: color,
    width: '100%',
    height: '100%',
  },
});

export const buildSvg = async (inner = () => {}) => {
  await writeToStream(
    `<svg version="1.1"
          width="${options.width}"
          height="${options.height}"
          xmlns="http://www.w3.org/2000/svg">`
  );

  await inner();

  await writeToStream('</svg>');
};
