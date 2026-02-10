module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies?.react) {
        pkg.dependencies.react = '19.2.4';
      }
      if (pkg.dependencies?.['react-dom']) {
        pkg.dependencies['react-dom'] = '19.2.4';
      }
      return pkg;
    },
  },
};
