import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/javascript/': [{
    text: 'Javascript',
    children: [
      '/javascript/json.md',
      '/javascript/client-cache.md',
    ]
  }]
};