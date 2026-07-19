// pages/+config.js
import vikeReact from "vike-react/config";

export default {
  extends: vikeReact,
  prerender: true,
  clientRouting: true,
  // Register custom config settings so page-level +config.js files
  // are allowed to set `metaDescription` and `keywords`.
  // (`title` is already a built-in vike-react setting.)
  meta: {
    keywords: {
      env: { server: true, client: true },
    },
    metaDescription: {
      env: { server: true, client: true },
    },
  },
};