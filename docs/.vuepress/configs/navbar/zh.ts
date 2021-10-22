import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '目录',
    children: [{
      text: "start1",
      link: "/start/01_start1.md"
    },
    {
      text: "start2",
      link: "/start/02_start2.md"
    }
  ]},
];