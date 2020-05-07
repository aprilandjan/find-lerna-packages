import globby from 'globby';
import path from 'path';

function flattenResults(results: Array<string[]>) {
  return results.reduce((acc, result) => acc.concat(result), []);
}

//  sync version for @lerna/lib/make-file-finder.js
export function makeFileFinder(rootPath: string, packageConfigs: string[]) {
  const globOpts: any = {
    cwd: rootPath,
    absolute: true,
    followSymlinkedDirectories: false,
    transform: (fp: string) => path.normalize(fp),
  };

  if (packageConfigs.some(cfg => cfg.indexOf("**") > -1)) {
    if (packageConfigs.some(cfg => cfg.indexOf("node_modules") > -1)) {
      throw new Error(
        "An explicit node_modules package path does not allow globstars (**)"
      );
    }

    globOpts.ignore = [
      // allow globs like "packages/**",
      // but avoid picking up node_modules/**/package.json
      "**/node_modules/**",
    ];
  }

  return (fileName: string, customGlobOpts?: any) => {
    //  the merged options
    const options = {
      ...customGlobOpts,
      ...globOpts,
    };

    const founded = packageConfigs.sort().map(packageConfig => {
      return globby.sync(path.join(packageConfig, fileName), options).sort();
    })
    return flattenResults(founded);
  }
}