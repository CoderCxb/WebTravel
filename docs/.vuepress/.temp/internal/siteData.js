export const siteData = {
  "base": "/",
  "lang": "zh-CN",
  "title": "Javascript之旅",
  "description": "",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/images/logo.png"
      }
    ]
  ],
  "locales": {
    "/": {
      "lang": "en-US",
      "title": "Javascript Travel",
      "description": "get a travel with us"
    },
    "/zh/": {
      "lang": "zh-CN",
      "title": " Javascript之旅",
      "description": "旅游"
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
