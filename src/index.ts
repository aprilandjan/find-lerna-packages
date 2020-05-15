import path from 'path';
import loadJsonFile from 'load-json-file';
import Project from '@lerna/project';
import Package from '@lerna/package';
import { makeFileFinder } from './syncMakeFileFinder';

/** represent lerna package instance */
interface LernaPackage {
  /** the name field in package.json */
  readonly name: string;
  /** the directory where the package locates */
  readonly location: string;
  readonly private: boolean;
  readonly resolved: string;
  /** the root path of the current lerna project */
  readonly rootPath: string;
  /** the bin field in package.json */
  readonly bin: { [key: string]: string };
  /** the script field in package.json */
  readonly scripts: { [key: string]: string };
  readonly manifestLocation: string;
  readonly nodeModulesLocation: string;
  /** the directory where the package bin executable locates */
  readonly binLocation: string;
  /** the version field in package.json */
  version: string;
  readonly dependencies: string[];
  readonly devDependencies: string[];
  readonly optionalDependencies: string[];
  readonly peerDependencies: string[];
  get: (key: string) => void;
  set: (key: string, val: any) => LernaPackage;
  toJSON: () => any;
}

function findPackagesAsync(cwd: string = process.cwd()): Promise<LernaPackage[]> {
  return new Project(cwd).getPackages();
}

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
  /** find packages async by cwd */
  (cwd?: string): Promise<LernaPackage[]>;
  /** find packages sync by cwd */
  sync(cwd?: string): LernaPackage[];
}

const f: any = findPackagesAsync;
f.sync = findPackagesSync;

export = f as findPackages;
