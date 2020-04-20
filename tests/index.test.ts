import path from 'path';
import getLernaPackages from '../src/index';

const cwd = path.join(__dirname, './fixtures/project');

describe('get packages async', () => {
  it('should get all packages in lerna project root directory', async () => {
    const packages = await getLernaPackages(cwd);
    expect(packages).toHaveLength(2);
    expect(packages[0].name).toEqual('bar');
    expect(packages[1].name).toEqual('foo');
  });
  it('should get all packages in lerna project sub package directory', async () => {
    const packages = await getLernaPackages(path.join(cwd, './packages/foo'));
    expect(packages).toHaveLength(2);
    expect(packages[0].name).toEqual('bar');
    expect(packages[1].name).toEqual('foo');
  });
  it('should get no packages outside lerna project directory', async () => {
    const packages = await getLernaPackages(path.join(cwd, '../'));
    expect(packages).toHaveLength(0);
  });
  it('should get no packages if current process running outside lerna project directory', async () => {
    const packages = await getLernaPackages();
    expect(packages).toHaveLength(0);
  })
});

// describe('get packages sync', () => {
//   it('should get all packages in lerna project root directory', () => {

//   });
//   it('should get all packages in lerna project sub package directory', () => {

//   });
//   it('should get no packages outside lerna project directory', () => {

//   });
// });
