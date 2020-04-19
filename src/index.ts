import { getPackages } from '@lerna/project';

const packages = getPackages(process.cwd());
console.log(packages);

/** get packages async */
export function getPackagesAsync(cwd: string) {
  return getPackages(cwd);
}

/** get packages sync */
export function getPackagesSync(cwd: string) {
  // TODO:
}

export default (cwd: string, sync: boolean = false) => {
  if (sync) {
    return getPackagesSync(cwd);
  }
  return getPackagesAsync(cwd);
}