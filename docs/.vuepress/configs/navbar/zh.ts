import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: 'Foo',
    link: '/zh/foo/',
  },
  {
    text: 'Group',
    children: [{
      text: "xxx",
      link: "/zh/group/foo.md"
    }
  ]},
];