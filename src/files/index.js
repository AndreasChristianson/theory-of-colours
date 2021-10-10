export { conditionallyViewOutputFile } from './conditionally-view-output-file.js';
export { closeOutputStream } from './close-output-stream.js';
export { openOutputFile } from './open-output-file.js';
export { writeToStream } from './write-to-stream.js';

let _writeStream;

export const setWriteStream = (writeStream) => {
  _writeStream = writeStream;
};

export const getWriteStream = () => {
  return _writeStream;
};
