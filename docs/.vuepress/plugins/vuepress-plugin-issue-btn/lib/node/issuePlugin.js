"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issuePlugin = void 0;
const utils_1 = require("@vuepress/utils");
const issuePlugin = (_, app) => {
    const { githubUrl } = _;
    if (app.env.isDev && app.options.bundler.endsWith('vite')) {
        // eslint-disable-next-line import/no-extraneous-dependencies
        app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(app.options.bundlerConfig.viteOptions, {
            optimizeDeps: {
                exclude: ['ts-debounce'],
            },
        });
    }
    return {
        name: 'vuepress-plugin-issue-btn',
        define: {
            __GLOBAL_GITHUB_URL__: githubUrl
        },
        clientAppRootComponentFiles: utils_1.path.resolve(__dirname, '../client/components/issue.js')
    };
};
exports.issuePlugin = issuePlugin;
