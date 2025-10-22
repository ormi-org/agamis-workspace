const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  transform: {
    '^.+\\.(ts|mjs|js|html|svg)$': 'jest-preset-angular',
  },
};
