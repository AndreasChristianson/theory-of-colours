import random from 'random';

export default (array) => array[random.int(0, array.length - 1)];
