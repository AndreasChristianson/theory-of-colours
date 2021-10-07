import log from 'npmlog';
import { writeToStream } from '../files/index.js';
import pack from '../../package.json';

const isIterable = (value) => typeof value !== "string" && Symbol.iterator in Object(value);

const objectToAttributes = (object = {}, separator = ' ') =>
  Object.entries(object)
    .map(([key, value]) => [key, isIterable(value) ? value.join('\n') : value])
    .map(([key, value]) => `${key}="${value}"`)
    .join(separator);


const writeElement = async (element, depth = 0) => {
  if (isIterable(element)) {
    return Promise.all(element.map(subElement => writeElement(subElement, depth)));
  } 
  const attributes = objectToAttributes(element.attributes);
  const closingTag = element.closingTag || `</${element.tag}>`
  const openingTag = element.openingTag ||`<${element.tag} ${attributes}>`
  if (!element.content) {
    await writeToStream(`${openingTag.slice(0,-1)}/>`, depth);
  } else if (typeof element.content === 'string') {
    await writeToStream(`${openingTag}${element.content}${closingTag}`, depth);
  } else {
    await writeToStream(`${openingTag}`, depth);
    await writeElement(element.content, depth + 1);
    await writeToStream(closingTag, depth);
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
      await writeElement({
        tag: 'svg',
        attributes,
        content: [
          {
            openingTag: '<!--',
            closingTag: '-->',
            content:`\n${pack.description}\n${pack.homepage}\n${pack.version}\n`
          },
          {
            openingTag: '<!--',
            closingTag: '-->',
            content: `\nParameters:\n${JSON.stringify(options, null,'  ')}\n`
          },
          ...await elementGenerator(options)
        ]
      })
    };
