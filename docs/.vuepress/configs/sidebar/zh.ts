import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/javascript/': [{
    text: 'Javascript',
    children: [
      '/javascript/grammar-foundation.md',
      '/javascript/operator.md',
      '/javascript/data-type.md',
      '/javascript/json.md',
      '/javascript/client-cache.md',
    ]
  }]
};