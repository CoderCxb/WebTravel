"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issue = void 0;
const vue_1 = require("vue");
require("../styles/vars.css");
require("../styles/issue.css");
exports.Issue = (0, vue_1.defineComponent)({
    name: 'Issue',
    setup() {
        const createIssue = () => window.open(`${__GLOBAL_GITHUB_URL__}/issues/new`, '_blank');
        const IssueEl = (0, vue_1.h)('div', { name: 'issue', class: 'issue-container', onClick: createIssue }, [
            (0, vue_1.h)('div', { class: 'issue-icon', onClick: createIssue }),
            (0, vue_1.h)('div', { class: 'issue-text', onClick: createIssue }, 'Issue'),
        ]);
        return () => IssueEl;
    },
});
exports.default = exports.Issue;
