import { ModuleFederationConfig } from "@nx/webpack";

const config: ModuleFederationConfig = {
  name: 'login-ui',
  exposes: {
    './LoginUI': './apps/login-ui/src/app/app.component.ts',
  }
};

export default config;