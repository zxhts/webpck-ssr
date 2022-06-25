if(typeof window === 'undefined'){
    global.window = {};
}
const fs = require("fs");
const path = require("path");
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/index-server'); // 服务端打包出来的文件
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');
const data = require("./data.json");



const server = (port) => {
    const app = express();

    app.use(express.static('dist')); //设置静态文件的目录
    app.get('/index', (req, res) => {
        const html = renderMarkup(renderToString(SSR))
        res.status(200).send(html);
    })

    app.listen(port, () => {
        console.log('localhost 3000');
    })
}

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
    const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
}

// const renderMarkup = (str) => {
//     return `<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>服务端打包渲染</title>
//         </head>
//         <body>
//             <div id="root">${str}</div>
//         </body>
//         </html>`
// }