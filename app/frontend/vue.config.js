const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: true,
    host: "0.0.0.0",
    port: "8083",
    allowedHosts: "strn.home",
  },
});
