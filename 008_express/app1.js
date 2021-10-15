// npm init --yes
// npm install express 또는 npm i exrpess
// npm i nodemon --save-dev
// -> nodemon app1 으로 실행 가능
const express = require('express');
// https://expressjs.com/ko/

const app = express();

app.get('/', (req, res, next) => {
    console.log('get으로 요청이 들어왔습니다!');
    res.send('hello world!!');
});
app.listen(8080);