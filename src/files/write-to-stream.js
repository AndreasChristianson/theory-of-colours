import log from 'npmlog';
import { getWriteStream } from './index.js';

const generateIndent = (indentLevel, indentString) => indentString.repeat(indentLevel);

export const writeToStream = async (stringToWrite, indentLevel = 0, indentString = '  ', suffix = '\n') =>
  new Promise((resolve) => {
    const indent = generateIndent(indentLevel, indentString)
    if (getWriteStream().write(`${indent}${stringToWrite}${suffix}`)) {
      resolve();
    } else {
      log.silly('fs buffer full. Pausing for drain event.');
      getWriteStream().once('drain', resolve);
    }
  });
