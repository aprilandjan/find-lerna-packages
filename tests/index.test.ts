import path from 'path';
import findPackages from '../src/index';

const cwd = path.join(__dirname, './fixtures/project');

describe('get packages async', () => {
  const getPackageNames = async (cwd?: string) => {
    const packages = await findPackages(cwd);
    return packages.map(p => p.name).sort();
  }
  it('should get all packages in lerna project root directory', async () => {
    const names = await getPackageNames(cwd);
    expect(names).toEqual(['bar', 'foo', 'muu']);
  });
  it('should get all packages in lerna project sub package directory', async () => {
    const names = await getPackageNames(path.join(cwd, './packages/foo'));
    expect(names).toEqual(['bar', 'foo', 'muu']);
  });
  it('should get no packages outside lerna project directory', async () => {
    const names = await getPackageNames(path.join(cwd, '../'));
    expect(names).toHaveLength(0);
  });
  it('should get no packages if current process running outside lerna project directory', async () => {
    const names = await getPackageNames();
    expect(names).toHaveLength(0);
  })
});

describe('get packages sync', () => {
  const getPackageNames = (cwd?: string) => {
    const packages = findPackages.sync(cwd);
    return packages.map(p => p.name).sort();
  }
  it('should get all packages in lerna project root directory', () => {
    const names = getPackageNames(cwd);
    expect(names).toEqual(['bar', 'foo', 'muu']);
  });
  it('should get all packages in lerna project sub package directory', async () => {
    const names = getPackageNames(path.join(cwd, './packages/foo'));
    expect(names).toEqual(['bar', 'foo', 'muu']);
  });
  it('should get all packages in lerna project sub package directory', () => {
    const names = getPackageNames(path.join(cwd, '../'));
    expect(names).toHaveLength(0);
  });
  it('should get no packages outside lerna project directory', () => {
    const names = getPackageNames();
    expect(names).toHaveLength(0);
  });
});
