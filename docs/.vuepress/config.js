module.exports = {
  lang: 'zh-CN',
  title: 'Javascript之旅',
  description: '',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  base: '/JavascriptTravel/',  
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'https://github.com/cxblovecw/StudyTravis',
    navbar: [
      {
        text: 'Foo',
        link: '/foo/',
      },
      {
        text: 'Group',
        children: [{
          text: "xxx",
          link: "/group/foo.md"
        }
      ]},
    ],
    sidebar: [
      '/documents/01_hello.md',
      '/documents/02_next.md',
    ]
  },
}