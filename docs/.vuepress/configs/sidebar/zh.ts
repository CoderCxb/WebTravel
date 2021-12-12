import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/javascript/': [{
    text: 'Javascript',
    children: [
      '/javascript/grammar-foundation.md',
      '/javascript/operator.md',
      {
        text: '数据类型',
        link: '/javascript/data-type/data-type.md',
        children: [
          '/javascript/data-type/primitive-data-type.md',
          '/javascript/data-type/object.md',
          '/javascript/data-type/type-judgement.md',
        ],
      },
      '/javascript/json.md',
      '/javascript/client-cache.md',
    ]
  }]
};