import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: 'Javascript',
    link: '/javascript/'
  },
  {
    text: 'Typescript',
    link: '/typescript/'
  },
  {
    text: '框架',
    children: [
      {
        text: 'React',
        link: '/frame/react/'
      },
      {
        text: 'Vue',
        link: '/frame/vue/'
      },
    ]
  },
  {
    text: 'Git',
    link: '/git/'
  },
  {
    text: '前端工程化',
    link: '/engineering/'
  },
];