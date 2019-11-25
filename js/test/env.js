require("babel-register")({
  "presets": ["env", "stage-0", "es2015"],
  "plugins": [
    "transform-decorators-legacy",
    "transform-runtime",
    ["module-resolver", {
      "alias": {
        "services": "./src/services"
      }
    }]
  ]
})

global.__PROJECT_INFO__ = {
  "type": "",
  "admin": false,
  "design": "desktop"
}

global.config = {
  requestSite: 'http://xbook.xc4cp.kf.gli.cn',
}

global.routeUrl = ''
