declare module '@lerna/project' {
  // project interface
  export const getPackages: (cwd: string) => Promise<any[]>;
}