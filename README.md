# [find-lerna-packages](https://www.npmjs.com/package/find-lerna-packages)

[![version](https://img.shields.io/npm/v/find-lerna-packages?style=flat-square)](https://www.npmjs.com/package/find-lerna-packages) [![version](https://img.shields.io/npm/dm/find-lerna-packages?style=flat-square)](https://www.npmjs.com/package/find-lerna-packages)

An utility module to help find lerna packages in lerna project programmatically, asynchronously or synchronously.

## Usage

Install via `yarn`:

```bash
yarn add find-lerna-package
```

Install via `npm`:

```bash
npm install find-lerna-packages
```

Then in your source codes:

```js
const findLernaPackages = require('find-lerna-packages');

// asynchronous: return a promise resolved with `LernaPackage` array
findLernaPackages(process.cwd()).then((pkgList) => {
  pkgList.forEach(pkg => {
    console.log(pkg.name, pkg.location);
  });
});

// synchronous: return `LernaPackage` array
findLernaPackages.sync(process.cwd()).map(pkg => {
  console.log(pkg.name, pkg.location);
});

// asynchronous: get `LernaPackage` directly by name
findLernaPackages.get('foo').then(pkg => {
  console.log(pkg.name, pkg.location);
});

// synchronous: get `LernaPackage` directly by name
const pkg = findLernaPackages.getSync('foo');
console.log(pkg.name, pkg.location);
```

## About `LernaPackage`

`LernaPackage` is actually the class describing lerna sub packages from `@lerna/package`, which is used by lerna cli internally. This utility module provides a simple type definition of it for friendly usage.

You can read package properties directly, such as `name`,`location`, `private`,`rootPath`, etc.

## LICENSE

MIT
