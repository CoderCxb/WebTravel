import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type issuePluginOptions = { githubUrl: string }

export const issuePlugin: Plugin<issuePluginOptions> = (_, app) => {
  const { githubUrl } = _;
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['ts-debounce'],
        },
      }
    )
  }

  return {
    name: 'vuepress-plugin-issue-btn',
    define: {
      __GLOBAL_GITHUB_URL__: githubUrl
    },
    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/Issue.js'
    )
  }
}
