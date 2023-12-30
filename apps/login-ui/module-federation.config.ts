import { ModuleFederationConfig } from "@nx/webpack";

const config: ModuleFederationConfig = {
  name: 'login-ui',
  exposes: {
    './Component': './apps/login-ui/src/app/app.component.ts'
  },
  shared: (packageName: string) => {
    if(packageName.startsWith('@agamis')) {
      return false;
    }
    if(packageName === 'msw') {
      return false;
    }
    if(packageName === 'tslib') {
      return false;
    }
  }
};

export default config;