# Agamis Workspace

Workspace is an host application for serving as .
It is based on :
- NodeJS : 18.17.1
- TypeScript
- Angular
- JVM runtime

# Installation

## Installation for local development

A kept up-to-date Dockerfile is provided in `.devcontainer` folder.

With Vscode, [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
and use the appropriate command to 'reopen the folder in container'.

Without Vscode, build the image with appropriate tag and use [`docker-compose.yml`](./.devcontainer/docker-compose.yml)
to run the development environment.

Docker image has following dependencies ready to use :
- NodeJS 18
- NPM
- OpenJDK 17
- Graphviz Java binaries (JAR)
- Plantuml Java binaries (JAR)
- PNPM latest

### Dependencies

⚠️ Do Not Use NPM as dependencies manager !

To install monorepo dependencies :<br/>
`pnpm install` | `pnpm i`

This will install all dependencies from `package.json`.

### Running commands

This monorepo use [NX workspace](https://nx.dev/).

Use then NX as any entrypoint for running workspace commands (build/test/run).

It is possible to use NX via NX console extension in most of IDE. (.vscode contains config to auto-install this extension).

## Usage

### From Sources

Download latest release in releases page.

### Plug-n-play

This software is made to be used as part of a Fusion Emby system.

This software can be deployed on a Fusion webapp node.

<!-- TODO -->

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed ways of contributing.

## License
This software is released under [Apache-2.0](https://choosealicense.com/licenses/apache-2.0/)

See [LICENSE](LICENSE) and [COPYRIGHT](COPYRIGHT)

## Used softwares
TypeScript : https://www.typescriptlang.org

Angular : https://angular.io

NodeJS : https://nodejs.org/fr

Docker : https://www.docker.com/
