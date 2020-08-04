module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.output.filename("[name].[chunkhash:8].js");
    }
  },
  /*
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    proxy: {
      "/": {
        target: "",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  */
};
