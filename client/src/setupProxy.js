const proxy = require("http-proxy-middleware");
// import { apiSettings } from "./api/lastfm";

module.exports = app => {
  if (process.env.NODE_ENV === "production") {
    app.use(proxy("/api", { target: "https://ws.audioscrobbler.com/2.0/" }));
  }
};
