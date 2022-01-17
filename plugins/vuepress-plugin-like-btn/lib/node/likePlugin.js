"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePlugin = void 0;
const utils_1 = require("@vuepress/utils");
const likePlugin = (_, app) => {
    if (app.env.isDev && app.options.bundler.endsWith('vite')) {
        // eslint-disable-next-line import/no-extraneous-dependencies
        app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(app.options.bundlerConfig.viteOptions, {
            optimizeDeps: {
                exclude: ['ts-debounce'],
            },
        });
    }
    return {
        name: 'vuepress-plugin-like-btn',
        clientAppRootComponentFiles: utils_1.path.resolve(__dirname, '../client/components/Like.js')
    };
};
exports.likePlugin = likePlugin;
