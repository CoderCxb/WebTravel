import { defineUserConfig } from '@vuepress/cli';
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { navbar, sidebar } from './configs';
const isProd = process.env.NODE_ENV === 'production';
export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'Javascript之旅',
  description: '',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  base: isProd ? '/JavascriptTravel/' : '/',  
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Javascript Travel',
      description: 'get a travel with us'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: ' Javascript之旅',
      description: '旅游'
    }
  },
  themeConfig: {
    logo: '/images/logo.png',
    repo: 'https://github.com/cxblovecw/StudyTravis',
    docsDir: 'docs',
    locales: {
      '/': {
        navbar:navbar.en,
        sidebar: sidebar.en,
        selectLanguageName: 'english',    
      },
      '/zh/': {
        navbar:navbar.zh,
        sidebar: sidebar.zh,
        // selectLanguageName: '简体中文',
        // selectLanguageText: '选择语言',
        // selectLanguageAriaLabel: '选择语言',
        // editLinkText: '在 GitHub 上编辑此页',
        // lastUpdatedText: '上次更新',
        // contributorsText: '贡献者',
      }
    }
  },
});