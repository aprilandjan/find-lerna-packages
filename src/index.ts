import { getPackages } from '@lerna/project';

const packages = getPackages(process.cwd());
console.log(packages);

export default packages;