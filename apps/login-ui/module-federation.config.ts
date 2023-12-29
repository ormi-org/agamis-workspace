import { ModuleFederationConfig } from "@nx/webpack";

const config: ModuleFederationConfig = {
  name: 'login-ui',
  exposes: {
    './Component': './apps/login-ui/src/app/app.component.ts',
    './Context': './apps/login-ui/src/app/core/services/models/context.ts'
  }
};

export default config;