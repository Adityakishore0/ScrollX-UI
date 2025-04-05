module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies?.react) {
        pkg.dependencies.react = "18.2.0";
      }
      if (pkg.dependencies?.["react-dom"]) {
        pkg.dependencies["react-dom"] = "18.2.0";
      }
      return pkg;
    },
  },
};
