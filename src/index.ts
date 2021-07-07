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

function getRootPackage(cwd: string = process.cwd()) {
  const project = new Project(cwd);
  return project.manifest as LernaPackage;
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

function getPackageByName(name: string, cwd: string = process.cwd()): Promise<LernaPackage | undefined> {
  return findPackagesAsync(cwd).then((packages) => {
    const result = packages.find(p => p.name === name);
    return Promise.resolve(result);
  });
}

function getPackageByNameSync(name: string, cwd: string = process.cwd()): LernaPackage | undefined {
  const packages = findPackagesSync(cwd);
  return packages.find(p => p.name === name);
}

interface findPackages {
  /** find packages async by cwd */
  (cwd?: string): Promise<LernaPackage[]>;
  /** find packages sync by cwd */
  sync(cwd?: string): LernaPackage[];
  /** get one package async by name in current lerna project */
  get(name: string, cwd?: string): Promise<LernaPackage | undefined>;
  /** get one package sync by name in current lerna project */
  getSync(name: string, cwd?: string): LernaPackage | undefined;
  /** get the root package in current lerna project */
  getRoot(cwd?: string): LernaPackage;
}

const f: any = findPackagesAsync;
f.sync = findPackagesSync;
f.get = getPackageByName;
f.getSync = getPackageByNameSync;
f.getRoot = getRootPackage;

export = f as findPackages;
