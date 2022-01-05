const { exec } = require("child_process");
const { argv } = require('process');

const [,,APPLICATION_ID,API_KEY,INDEX_NAME,START_URLS] = argv;

console.log(APPLICATION_ID,API_KEY,INDEX_NAME,START_URLS);

exec(`git clone https://github.com/cxblovecw/docsearch-scraper && cd docsearch-scraper && yarn set-up ${APPLICATION_ID} ${API_KEY} ${INDEX_NAME} ${START_URLS} && make shell && make search`, (err)=>{
  if(err) return ;
  console.log(stdout, stderr);
});