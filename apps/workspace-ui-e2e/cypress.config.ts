import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';


module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: './src/support/e2e.ts',
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
 
    
  },
});
export default defineConfig({
  e2e:
    nxE2EPreset(__dirname),
  
});
