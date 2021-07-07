declare module '@lerna/project' {
  // project interface
  // https://www.typescriptlang.org/docs/handbook/interfaces.html#class-types
  class Project {
    constructor(cwd: string);
    getPackages: () => Promise<any[]>;
    packageConfigs: string[];
    rootPath: string;
    manifest: any;
  }
  export = Project;
}

declare module '@lerna/package' {
  class Package {
    constructor(pkg: any, location: string, rootPath?: string);
  }
  export = Package;
}