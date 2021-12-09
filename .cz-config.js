module.exports = {
  types: [
    { "type": "feat",     "value": "✨ Features                 | 新功能" },
    { "type": "fix",      "value": "🐛 Bug Fixes                | Bug修复" },
    { "type": "init",     "value": "🎉 Init                     | 初始化" },
    { "type": "docs",     "value": "📖 Documentation            | 文档" },
    { "type": "style",    "value": "💄 Styles                   | 风格" },
    { "type": "refactor", "value": "🔧 Code Refactoring         | 代码重构" },
    { "type": "perf",     "value": "🛫️ Performance Improvements | 性能优化" },
    { "type": "test",     "value": "✅ Tests                    | 测试" },
    { "type": "revert",   "value": "⏪ Revert                   | 回退" },
    { "type": "build",    "value": "📦‍ Build System             | 打包构建" },
    { "type": "chore",    "value": "🚀 Chore                    | 构建/工程依赖/工具" },
    { "type": "ci",       "value": "👷 Continuous Integration   | CI 配置" }
  ],

  scopes: [
    { name: "文档内容更新" },
    { name: "文档结构变更" },
    { name: "CI流程/项目构建" },
  ],

  messages: {
    type: "选择你要提交的类型:",
    scope: "\n标注此次改动的影响范围(可选):",
    customScope: "\n标注此次改动的影响范围(可选)",
    subject: "简要的描述本次改动:\n",
    body: "详细描述本次改动,使用'|'换行(可选):\n",
    breaking: "列举出所有Breaking Changes(可选):\n",
    confirmCommit: "确认提交本次改动?(y/n)",
  },

  allowCustomScopes: false, 
  allowBreakingChanges: ["feat", "fix","revert", "chore"],
  skipQuestions: ['footer'], // 跳过footer

  appendBranchNameToCommitMessage: true,
  subjectLimit: 100,
  breaklineChar: '|', // 仅在body和footer生效
};