import {
  getGaussianGenerator,
  getTruncatedGaussianGenerator,
  getUniformIntGenerator,
  setupSeed,
} from '.';
import random from 'random';
import seedRandom from 'seedrandom';
import { describe } from 'jest-circus';

describe('random/index.js', () => {
  describe('random', () => {
    describe('shortcuts', () => {
      it('should be predictable', () => {
        const rand1 = random.clone(seedRandom('abc'));
        const rand2 = random.clone(seedRandom('abc'));

        expect(rand1.float()).toEqual(rand2.float());
      });
    });
    describe('thunks', () => {
      it('should be predictable', () => {
        const rand1 = random.clone(seedRandom('abc'));
        const rand2 = random.clone(seedRandom('abc'));

        const thunk1 = rand1.normal();
        const thunk2 = rand2.normal();

        expect(thunk1()).toEqual(thunk2());
        expect(thunk1()).toEqual(thunk2());
      });
    });
  });

  describe('setSeed', () => {
    describe('shortcuts', () => {
      it('should be predictable', () => {
        setupSeed(12345);
        const rand1 = getUniformIntGenerator(0, 100_000);

        setupSeed(12345);
        const rand2 = getUniformIntGenerator(0, 100_000);

        expect(rand1()).toEqual(rand2());
      });
    });
    describe('thunks', () => {
      it('should be predictable', () => {
        setupSeed(12345);
        const rand1 = getGaussianGenerator();

        setupSeed(12345);
        const rand2 = getGaussianGenerator();

        expect(rand1()).toEqual(rand2());
      });
    });
  });

  describe('truncated gaussian generator', () => {
    describe('min truncation', () => {
      it('should be in the correct range', () => {
        const generator = getTruncatedGaussianGenerator(0, 1, 3, 4);

        expect(generator()).toBeGreaterThan(3);
        expect(generator()).toBeGreaterThan(3);
        expect(generator()).toBeGreaterThan(3);
      });
    });
    describe('max truncation', () => {
      it('should be in the correct range', () => {
        const generator = getTruncatedGaussianGenerator(0, 1, -4, -3);

        expect(generator()).toBeLessThan(-3);
        expect(generator()).toBeLessThan(-3);
        expect(generator()).toBeLessThan(-3);
      });
    });
  });
});
