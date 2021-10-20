export const data = {
  "key": "v-20a40a15",
  "path": "/documents/01_hello.html",
  "title": "1111",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "documents/01_hello.md",
  "git": {
    "updatedTime": 1634212790000,
    "contributors": [
      {
        "name": "陈小斌",
        "email": "chenxiaobin@chenxiaobindeMacBook-Pro.local",
        "commits": 1
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
