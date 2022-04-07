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
          {
            text: '原型链',
            link: '/javascript/data-type/prototype/prototype.md'
          },
          {
            text:'引用数据类型',
            link:'/javascript/data-type/object/object-data-type.md',
            children:[
              '/javascript/data-type/object/object.md',
              '/javascript/data-type/object/array.md',
              '/javascript/data-type/object/date.md',
              '/javascript/data-type/object/reg-exp.md',
              '/javascript/data-type/object/primitive-object.md',
              '/javascript/data-type/object/set.md',
              '/javascript/data-type/object/map.md',
              {
                text:'内置对象',
                link: '/javascript/data-type/object/build-in-object/build-in-object.md',
                children:[
                  '/javascript/data-type/object/build-in-object/math.md',
                ],
              },
            ]
          },
          '/javascript/data-type/type-conversion.md',
          '/javascript/data-type/type-judgement.md',
        ],
      },
      '/javascript/function.md',
      '/javascript/reflect.md',
      '/javascript/proxy.md',
      '/javascript/json.md',
      '/javascript/client-cache.md',
    ]
  }],
  '/typescript/': [{
    text: 'Typescript',
    children:[
      '/typescript/basic-type.md',
      '/typescript/type-alias.md',
      '/typescript/advanced-type.md',
      '/typescript/type-guard.md',
      '/typescript/type-compatibility.md',
      '/typescript/type-assertion.md',
      '/typescript/class.md',
      '/typescript/interface.md',
      '/typescript/enum.md',
      '/typescript/decorator.md',
      '/typescript/function.md',
      '/typescript/generics.md',
      '/typescript/build-in-type.md',
      '/typescript/skills.md',
    ]
  }]
};