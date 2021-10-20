// npm init --yes
// npm install express 또는 npm i exrpess
// npm i nodemon --save-dev
// -> nodemon app1 으로 실행 가능
const express = require('express');
// https://expressjs.com/ko/

const app = express();
// app.METHOD(PATH, HANDLER(req, res, next)) 구조를 가지고 있음
//  - HANDLER를 미들웨어라고 함(기존에 작성되어 있는 미들웨어도 있음)
//  - express는 미들웨어의 연결입니다!
//  - req(get: '/') -> app.use(미들웨어) -> app.use(미들웨어) ... -> app.get('/') -> app.post('/writenotice') -> ...
//  - 위 구조라고 한다면  app.get('/')까지만 실행되고 사용자에게 응답하는 방식
// app.get, app.post, app.put, app.delete
// app.all : 위 모든 것을 처리
// app.use(미들웨어) : 모든 곳에서 미들웨어 사용하겠다!
//  - app.use('/hello', 미들웨어) : '/hello'에서만 미들웨어 사용하겠다!
//  - app.get('/hello', 미들웨어) : '/hello'에서 get 요청일때만 미들웨어 사용하겠다!
// app.set을 통해 데이터 저장 가능
// app.route(체인 가능한 라우트 핸들러 작성 가능, 여러 메서드 연결 가능하다는 얘기)
// express.Router : Router 클래스를 사용하면 모듈식 마운팅이 가능, Router 인스턴스는 완전한 미들웨어, 하나로서 라우팅 시스템, 미니 앱이라 불림 -> 그림으로 표현해드림, 실습은 009에서
app.get('/', (req, res, next) => {
    console.log('get으로 요청이 들어왔습니다!');
    res.send('hello world!!');
    // 다음 메소드 중 하나라도 호출되지 않는다면 브라우저가 계속 뺑글뺑글 돕니다.(공식문서 표현 : 요청이 정지된 상태로 방치된다고 하죠.) 2개를 사용하셔도 애러가 납니다.
    // res.download()	파일이 다운로드되도록 프롬프트합니다.
    // res.end()	응답 프로세스를 종료합니다.
    // res.json()	JSON 응답을 전송합니다.
    // res.jsonp()	JSONP 지원을 통해 JSON 응답을 전송합니다.
    // res.redirect()	요청의 경로를 재지정합니다.
    // res.render()	보기 템플리트를 렌더링합니다.
    // res.send()	다양한 유형의 응답을 전송합니다.
    // res.sendFile()	파일을 옥텟 스트림의 형태로 전송합니다.
    // res.sendStatus()	응답 상태 코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송합니다.
});
app.listen(8080);