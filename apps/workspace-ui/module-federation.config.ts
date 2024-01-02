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
  library: {
    name: 'workspace-ui',
    type: 'module'
  },
  remotes: ['login-ui'],
  additionalShared: [
    // vendors
    {
      libraryName: '@angular/common',
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
      libraryName: '@angular/router',
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
      libraryName: 'tslib',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    {
      libraryName: 'msw',
      sharedConfig: {
        singleton: true, eager: true
      }
    },
    // custom
    {
      libraryName: '@agamis/workspace/shared/common/msw-handlers',
      sharedConfig: {
        singleton: true, eager: true, requiredVersion: '^0.0.1'
      }
    },
    {
      libraryName: '@agamis/workspace/shared/common/types',
      sharedConfig: {
        singleton: true, eager: true, requiredVersion: '^0.0.1'
      }
    },
    {
      libraryName: '@agamis/workspace/shared/common/angular',
      sharedConfig: {
        singleton: true, eager: true, requiredVersion: '^0.0.1'
      }
    }
  ]
};

export default config;
