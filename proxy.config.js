const PROXY_CONFIG = [
  {
    "context":["/search/*"],
    "target": "https://openlibrary.org",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,

  }
]
module.exports
 = PROXY_CONFIG
