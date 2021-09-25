export { conditionallyOpenOutputFile } from './conditionally-open-file.js';
export { closeFile } from './close-file.js';
export { openFile } from './open-file.js';
export { writeToStream } from './write-to-stream.js';

let _writeStream;

export const setWriteStream = (writeStream) => {
  _writeStream = writeStream;
};

export const getWriteStream = () => {
  return _writeStream;
};
