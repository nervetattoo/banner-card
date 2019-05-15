import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "banner-card.js",
    format: "umd",
    name: "BannerCard"
  },
  plugins: [resolve(), terser()]
};
