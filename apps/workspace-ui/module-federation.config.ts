import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'workspace-ui',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: ['login-ui'],
  additionalShared: [
    {
      libraryName: '@angular/core',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: '@angular/common',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: '@angular/router',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: '@angular/common/http',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: '@angular/forms',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: '@angular/core',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: '@angular/core/primitives/signals',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: '@angular/platform-browser',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: 'rxjs',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: 'rxjs/operators',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: 'LoginUI',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
  ]
};

export default config;
