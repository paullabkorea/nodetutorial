// npm i morgan dotenv
const express = require('express');
const morgan = require('morgan'); // 추가로그 확인
const dotenv = require('dotenv'); // 미들웨어 아닙니다. 여러 패스워드 및 환경 설정을 위해 사용합니다. 보통은 .gitignore를 설정하여 이 파일을 무시하도록 합니다. .gitignore 파일로 들어가보세요. push가 안되는 파일들 목록을 보실 수 있습니다.
// 아래와 같이 설정하면 원격 파일을 제거합니다. 로컬에 있는 파일은 삭제하지 않습니다.
// 꼭 최상위 폴더가 아니어도 괜찮습니다. 알아서 현재폴더 기준으로 무시합니다.
// 지금 d라는 폴더는 push가 되었지만, a, b, c 폴더는 push가 안된 것을 볼 수 있습니다.
// git rm -r --cached .
// git rm -r --cached [File name]
// 이걸 일반적인 파일로 관리할 수도 있지만, 실무에서는 그렇게 하지 않습니다.
// 보통 실무에서는 config.js를 만들어서 거기에 dotenv를 import하여 key:value 매핑하여
// 사용합니다. 그렇게 하면 자동완성이 되기 때문이에요.
const path = require('path');

dotenv.config(); // process.env 관리를 위해 사용합니다.

console.log("DB_HOST:", process.env.SECRET);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const app = express();

app.use(morgan('dev')); // 배포할 때에는 dev 대신 combined, combined를 사용하면 브라우저, ip 등이 뜹니다. 저는 보통 app 바로 아래 넣어놓습니다.
app.use('/', express.static(path.join(__dirname, 'resource'))); // 해당 폴더에서 정적파일 제공(기본 제공), resouce는 외부노출 url이 아닙니다.
// 보통은 public 폴더로 사용하는데 보안상 권장하지 않음, 뒤에 난해한 이름을 붙이기도 함
// static 옵션은 공식 문서 참고
// 순서가 중요해서 저는 보통 app 바로 아래, morgan 바로 아래에 넣는 편입니다.
// 왜냐하면 정적파일을 찾아버리면 아래 미들웨어로 넘어가지 않아서 리소스를 아낄 수 있습니다.
// 로그인 사용자에게만 해당 파일이 보여질 경우 session 부분이 상단으로 가긴 합니다.
// 링크 : http://expressjs.com/ko/api.html#express.static


app.use(express.json()) // body parsing
// 그 외에도 common, short, tiny 등 사용 가능
app.use(express.urlencoded({ extended: false })); // 위와 동일하게 body parsing
// 주로 html의 form 데이터 파싱(이미지는 처리 못해요. multer사용을 권합니다.), 옵션은 필수입니다. 최근에 express에 일부 기능이 들어와 있는 상태입니다. 따로 npm i body-parser를 안해주셔도 됩니다.
// extended true -> qs 모듈이 query 해석
// extended false -> node의 querystring 모듈이 qeury 해석
// post와 put에서 주로 사용. req.on('data'), req.on('end')를 사용할 필요가 없음

app.get('/', (req, res, next) => {
    res.status(200).send('hello world');
})


app.use((req, res, next) => {
    // 위에 요청 처리 구문이 없으면 모든 요청에 대한 처리
    // 위에 요청이 있다면 없는 요청에 대한 처리
    // 이 코드가 맨 앞으로 가면 모든 요청에 대해 404
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.log('애러발생!');
    console.log(err);
});

app.listen(8080);