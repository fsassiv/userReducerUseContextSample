const proxy = require("http-proxy-middleware");
import { apiSettings } from "./api/lastfm";

module.exports = app => {
  if (process.env.NODE_ENV === "production") {
    app.use(proxy("/api", { target: apiSettings.baseUrl }));
  }
};
