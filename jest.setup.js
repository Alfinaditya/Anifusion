import '@testing-library/jest-dom/extend-expect';
import crypto from 'crypto';
import * as matchers from 'jest-extended';
import 'isomorphic-fetch';

expect.extend(matchers);

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: (arr) => crypto.randomUUID(),
  },
});
