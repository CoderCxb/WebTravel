import { defineComponent, h, Transition } from 'vue'
import { useSiteData, usePageData,useSiteLocaleData,usePagesData,useRoute } from '@vuepress/client'

import '../styles/vars.css'
import '../styles/issue.css'

declare const __GLOBAL_GITHUB_URL__: string;

export const Issue = defineComponent({
  name: 'Issue',
  setup() { 
    const createIssue = () => window.open(`${__GLOBAL_GITHUB_URL__}/issues/new`,'_blank')
    const IssueEl = h('div', { name:'issue', class : 'issue-container', onClick: createIssue }, [
      h('div', { class: 'issue-icon' }),
      h('div', { class: 'issue-text' }, 'Issue'),
    ])
    
    return () => IssueEl;
  },
})

export default Issue
