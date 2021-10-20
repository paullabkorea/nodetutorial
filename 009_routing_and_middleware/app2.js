// npm init --yes
// npm i express
// npm i nodemon --save-dev
// -> nodemon app1 으로 실행 가능
// 기본 라우팅 공식문서
// https://expressjs.com/ko/starter/basic-routing.html
// 라우팅 공식문서(필독!)
// https://expressjs.com/ko/guide/routing.html
// 정규표현식 -> 노션 문서 참고
// https://ridibooks.com/books/2773000049
const express = require('express');
const indexRouter = require('./router'); // 뒤에 index.js 생략 가능
const blogRouter = require('./router/blog.js');

const app = express();

app.use('/', indexRouter);
app.use('/blog', blogRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.log('애러발생!');
    console.log(err);
});

app.listen(8080);