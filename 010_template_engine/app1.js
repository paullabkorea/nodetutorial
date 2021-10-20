// template 엔진
// 1위 : ejs, 2위 : handlebars, 3위 : mustache
// express와 함께 사용하는 퍼그와 넌적스(https://colorlib.com/wp/top-templating-engines-for-javascript/)
// 1위인 EJS를 사용하지 않고 넌적스를 사용하는 이유 : 초급자가 사용하기엔 넌적스가 최고! 템플릿 상속을 통해 빠르게 UI를 구현할 수 있습니다. 물론 1위는 다 이유가 있습니다. 나중에 다 경험해보시길 권해드립니다!
// 공식 url : https://mozilla.github.io/nunjucks/
// npm init --yes
// npm i nunjucks express
// npm i nodemon --save-dev
// -> nodemon app1 으로 실행 가능
const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'html');

nunjucks.configure('template', {
    autoescape: true,
    express: app,
    watch: true
});
// template를 인식하고 사용하겠다
// autoescape는 보안상 true (false일 경우 html 태그 허용, DBD 공격 가능)
// express : app, 사용할 객체 지정
// watch: true 옵션을 사용하면 HTML파일이 변경될 때 템플릿 엔진 다시 렌더링

app.get('/', (req, res) => {
    res.render('test1.html', { 
        // error : __dirname + '/test.html'
        // error : path.join(__dirname, 'test.html')
        // complete : path.join(__dirname, 'template', 'test.html')
        // complete : test.html or ./test.html
        name : "hojun!",
        age : 10
    });
});

app.listen(8080);