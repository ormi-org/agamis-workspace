const {
  withNativeFederation,
  shareAll,
} = require('@angular-architects/native-federation');

module.exports = withNativeFederation({
  name: 'agamis-ws-login-ui',

  exposes: {
    './Components': './src/app/app.component.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },

  skip: [
    
  ]
});