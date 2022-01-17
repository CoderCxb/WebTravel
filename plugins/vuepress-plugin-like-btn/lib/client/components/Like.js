"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const vue_1 = require("vue");
const client_1 = require("@vuepress/client");
require("../styles/vars.css");
require("../styles/like.css");
exports.Like = (0, vue_1.defineComponent)({
    name: 'Like',
    setup() {
        let like = (0, vue_1.ref)(0);
        let pageData = (0, client_1.usePageData)();
        let filePath = pageData.value['filePathRelative'] || "javascript/README.md";
        const router = (0, client_1.useRouter)();
        const baseURL = 'https://web-travel-server-4efdo05e0688f3-1256927712.ap-shanghai.app.tcloudbase.com/koa-starter';
        function getLikeCount() {
            pageData = (0, client_1.usePageData)();
            filePath = pageData.value['filePathRelative'];
            fetch(`${baseURL}/like-count?doc=${filePath}`, {
                method: "GET",
            }).then(res => res.json()).then(lastRes => {
                const { data } = lastRes;
                like.value = data[0] ? data[0].like : 0;
            }).catch(err => {
                console.log(err);
            });
        }
        window.onload = getLikeCount;
        (0, vue_1.watch)(router.currentRoute, getLikeCount);
        const { docsArrStr = '[]' } = localStorage;
        let docsArr = JSON.parse(docsArrStr);
        const likeClick = () => {
            pageData = (0, client_1.usePageData)();
            filePath = pageData.value['filePathRelative'];
            if (docsArr.includes(filePath)) {
                fetch(`${baseURL}/cancel-like?doc=${filePath}`, {
                    method: "GET",
                }).then(res => res.json()).then(lastRes => {
                    const { data } = lastRes;
                    like.value = data[0] ? data[0].like : 0;
                }).catch(err => {
                    console.log(err);
                });
                docsArr = docsArr.filter((v) => v !== filePath);
            }
            else {
                docsArr.push(filePath);
                fetch(`${baseURL}/like?doc=${filePath}`, {
                    method: "GET",
                }).then(res => res.json()).then(lastRes => {
                    const { data } = lastRes;
                    like.value = data[0] ? data[0].like : 0;
                }).catch(err => {
                    console.log(err);
                });
            }
            localStorage.setItem('docsArrStr', JSON.stringify(docsArr));
        };
        return () => (0, vue_1.h)('div', { name: 'like', class: 'like-container', onClick: likeClick }, [
            (0, vue_1.h)('div', { class: 'like-icon' }),
            (0, vue_1.h)('div', { class: 'like-text' }, { default: () => like.value }),
        ]);
    },
});
exports.default = exports.Like;
function useEffect(arg0, arg1) {
    throw new Error('Function not implemented.');
}
