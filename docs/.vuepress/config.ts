import { defineUserConfig } from '@vuepress/cli';
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { navbar, sidebar } from './configs';
import { path } from '@vuepress/utils';
const isProd = process.env.NODE_ENV === 'production';
export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'Web之旅',
  description: '',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  base: isProd ? '/WebTravel/' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: ' Web之旅',
      description: '旅游'
    }
  },
  themeConfig: {
    logo: '/images/logo.png',
    repo: 'https://github.com/cxblovecw/WebTravel',
    darkMode:true,
    locales: {
      '/': {
        navbar: navbar.zh,
        sidebar: sidebar.zh,
        docsBranch: 'master',
        docsDir: 'docs',
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
      }
    }
  },
  markdown:{
    links:false
  },
  plugins: [
    [
      '@vuepress/plugin-docsearch',
      {
        apiKey: '5b4fcfc18aa792d837f988a6338e41ee',
        appId: 'AS1KXHESMU',
        indexName: 'webtravel',
      }, 
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
});