export const themeData = {
  "logo": "/images/logo.png",
  "repo": "https://github.com/cxblovecw/StudyTravis",
  "docsDir": "docs",
  "locales": {
    "/": {
      "navbar": [],
      "sidebar": [],
      "selectLanguageName": "english"
    },
    "/zh/": {
      "navbar": [
        {
          "text": "Foo",
          "link": "/zh/foo/"
        },
        {
          "text": "Group",
          "children": [
            {
              "text": "xxx",
              "link": "/zh/group/foo.md"
            }
          ]
        }
      ],
      "sidebar": [
        "/zh/01_hello.md",
        "/zh/02_next.md"
      ]
    }
  },
  "navbar": [],
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebar": "auto",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
