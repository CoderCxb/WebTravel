import { defineComponent, h, onUpdated, ref, watch } from 'vue'
import { usePageData, useRouter } from '@vuepress/client'
import '../styles/vars.css'
import '../styles/like.css'

export const Like = defineComponent({
  name: 'Like',
  setup() {
    let like = ref(0);
    let pageData = usePageData();
    let filePath = pageData.value['filePathRelative'] || "javascript/README.md";
    const router = useRouter();
    const baseURL = 'https://web-travel-server-4efdo05e0688f3-1256927712.ap-shanghai.app.tcloudbase.com/koa-starter';
    function getLikeCount(){
      pageData = usePageData();
      filePath = pageData.value['filePathRelative'];
      fetch(`${baseURL}/like-count?doc=${filePath}`, {
        method: "GET",
      }).then(res=>res.json()).then(lastRes=>{
        const { data } = lastRes;
        like.value = data[0]? data[0].like : 0;
      }).catch(err=>{
        console.log(err);
      })
    }
    window.onload = getLikeCount;
    watch(router.currentRoute, getLikeCount)
    const { docsArrStr = '[]' } = localStorage;
    let docsArr: Array<string> = JSON.parse(docsArrStr);
    const likeClick = ()=>{
      pageData = usePageData();
      filePath = pageData.value['filePathRelative'];
      if(docsArr.includes(filePath)){
        fetch(`${baseURL}/cancel-like?doc=${filePath}`, {
          method: "GET",
        }).then(res=>res.json()).then(lastRes=>{
          const { data } = lastRes;
          like.value = data[0]? data[0].like : 0;
        }).catch(err=>{
          console.log(err);
        })
        docsArr = docsArr.filter((v)=> v !== filePath);
      }else{
        docsArr.push(filePath);
        fetch(`${baseURL}/like?doc=${filePath}`, {
          method: "GET",
        }).then(res=>res.json()).then(lastRes=>{
          const { data } = lastRes;
          like.value = data[0]? data[0].like : 0;
        }).catch(err=>{
          console.log(err);
        })
      }
      localStorage.setItem('docsArrStr', JSON.stringify(docsArr));
    }  
    
    return () => h('div', { name:'like', class : 'like-container', onClick: likeClick }, [
      h('div', { class: 'like-icon' }),
      h('div', { class: 'like-text' }, { default: () => like.value }),
    ]);
  },
})

export default Like
