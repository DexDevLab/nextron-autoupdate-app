const path = require("path");
module.exports = {
  mainSrcDir: "main",
  rendererSrcDir: "renderer",
  webpack: ({ resolve, ...config }, env) => {
    // do some stuff here
    config.resolve = {
      ...resolve,
      alias: {
        ...resolve.alias,
        "@/*": path.resolve(__dirname, "./*"), // maps @something to path/to/something
      },
    };

    return config;
  },
};
