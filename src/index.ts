import path from 'path';
import loadJsonFile from 'load-json-file';
import Project from '@lerna/project';
import Package from '@lerna/package';
import { makeFileFinder } from './syncMakeFileFinder';

/** represent lerna package instance */
interface LernaPackage {
  readonly name: string;
  readonly location: string;
  readonly private: boolean;
  readonly resolved: string;
  readonly rootPath: string;
  readonly bin: { [key: string]: string };
  readonly scripts: { [key: string]: string };
  readonly manifestLocation: string;
  readonly nodeModulesLocation: string;
  readonly binLocation: string;
  version: string;
  readonly dependencies: string[];
  readonly devDependencies: string[];
  readonly optionalDependencies: string[];
  readonly peerDependencies: string[];
  get: (key: string) => void;
  set: (key: string, val: any) => LernaPackage;
  toJSON: () => any;
}

/** find packages async by cwd */
function findPackagesAsync(cwd: string = process.cwd()): Promise<LernaPackage[]> {
  return new Project(cwd).getPackages();
}

/** find packages sync by cwd */
function findPackagesSync(cwd: string = process.cwd()): LernaPackage[] {
  const project = new Project(cwd);
  const finder = makeFileFinder(project.rootPath, project.packageConfigs);
  const results = finder('package.json');
  return results.map(packageJsonPath => {
    const packageJson = loadJsonFile.sync(packageJsonPath);
    return new Package(packageJson, path.dirname(packageJsonPath), project.rootPath);
  }) as LernaPackage[];
}

interface findPackages {
  (cwd?: string): Promise<LernaPackage[]>;
  sync(cwd?: string): LernaPackage[];
}

const f: any = findPackagesAsync;
f.sync = findPackagesSync;

export = f as findPackages;
