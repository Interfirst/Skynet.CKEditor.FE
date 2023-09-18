# Skynet.CKEditor.FE

## Installation

#### Clone the repository

```bash
git clone git@github.com:Interfirst/Skynet.CKEditor.FE.git
cd Skynet.CKEditor.FE
yarn install
```

## Build

```bash
yarn build
```

## Start

```bash
yarn start
```

## HMR mode (on base of Admin Panel)

1. Manually run `yarn build` in Skynet.CKEditor.FE - this command will create `build` folder in root directory
2. Then go to Skynet.AdminPanel.UI repo and make sure that $npm_package_config_ckeditor_build_remote_path and $npm_package_config_ckeditor_build_local_path are set correctly
3. Run `yarn start:ckeditor` - this command will track any change in `build` folder of Skynet.CKEditor.FE repo and will recompile AdminPanelUI
4. Make any change in Skynet.CKEditor.FE repo. If you have opened AdminPanel app - it will refresh page as soon as recompiling is done, otherwise new page will be opened at '/' route.

## Publish package

1. Build package locally (yarn run build)
2. Get npm auth token and add it to .npmrc
3. Run `npm publish`
