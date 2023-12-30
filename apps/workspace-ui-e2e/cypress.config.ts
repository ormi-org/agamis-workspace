import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    ...nxE2EPreset(__dirname)
  }
});
