// npm i jsonwebtoken

const jwt = require('jsonwebtoken');
const secretKey = require('./secret').secretKey;
const options = require('./secret').options;

const token = jwt.sign(
    {
        id: 'hojun',
        grade: 'super gold'
    },
    secretKey, options); 
    

jwt.verify(token, secretKey, (err, decoded) => {
    console.log(err, decoded)
});

console.log(token); // token은 비밀값이 아니에요. https://jwt.io/에서 해독 가능합니다.