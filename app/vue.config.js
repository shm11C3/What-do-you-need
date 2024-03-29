const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: true,
    host: "0.0.0.0",
    port: "8083",
    allowedHosts: process.env.VUE_APP_HOSTNAME,
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "What do you need?",
    },
  },
});
