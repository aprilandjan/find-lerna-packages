import { getPackages } from '@lerna/project';

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

/** get packages async by cwd */
function findPackagesAsync(cwd: string = process.cwd()): Promise<LernaPackage[]> {
  return getPackages(cwd);
}

// /** get packages sync by cwd */
// export function getPackagesSync(cwd: string): LernaPackage[] {
//   // TODO:
//   return [];
// }

// interface GetLernaPackages {
//   (sync: boolean): LernaPackage[];
//   (sync: false): Promise<LernaPackage[]>;
// }

// export default findPackagesAsync;
export = findPackagesAsync;
