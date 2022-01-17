import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type likePluginOptions = { githubUrl: string }

export const likePlugin: Plugin<likePluginOptions> = (_, app) => {
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
    name: 'vuepress-plugin-like-btn',
    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/Like.js'
    )
  }
}
