export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "English",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "This is document with en",
      "slug": "this-is-document-with-en",
      "children": []
    }
  ],
  "filePathRelative": "README.md",
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
