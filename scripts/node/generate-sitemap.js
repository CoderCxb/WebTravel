const { writeFileSync } = require('fs')
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require( 'stream' )

// An array with your links
const links = [{ url: '/JavascriptTravel',  changefreq: 'daily', priority: 0.3  }]

// Create a stream to write to
const stream = new SitemapStream( { hostname: 'https://cxblovecw.github.io' } )

// Return a promise that resolves with your XML string
return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>{
    writeFileSync('./docs/.vuepress/public/sitemap.xml',data.toString());
  }  
)