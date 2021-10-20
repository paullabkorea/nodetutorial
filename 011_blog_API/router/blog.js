const nunjucks = require('nunjucks');
const express = require('express');
// require('express-async-errors');

let blogs = [{
        id : 1,
        title : 'title1',
        content : 'content1',
        section : 'section1',
        pubDate : new Date().toString(),
        modDate : new Date().toString()
    }, {
        id : 2,
        title : 'title2',
        content : 'content2',
        section : 'section2',
        pubDate : new Date().toString(),
        modDate : new Date().toString()
    }, {
        id : 3,
        title : 'title3',
        content : 'content3',
        section : 'section3',
        pubDate : new Date().toString(),
        modDate : new Date().toString()
    }];

const router = express.Router();

// * / - 메인화면 최근 게시물 3개
// * /blog - 블로그 글 리스트 전부
router.get('/', (req, res, next) => {
    console.log(req.query);
    const section = req.query.section;
    const data = section ? blogs.filter(b => b.section === section) : blogs;
    res.status(200).json(data);
})
// * /blog/?section=:section - 해당 섹션만 모아 볼 수 있도록
// * /about - 내 소개
// * /blog/:id - 블로그 상세 글
router.get('/:id', (req, res, next) => {
    // console.log(req.params.id);
    const id = req.params.id;
    // console.log(blogs.find(b => b.id == 1));
    const blog = blogs.find(b => b.id == id); //타입이 number, string
    if (blog) {
        res.status(200).json(blog);
    } else {
        res.status(404).json({warninig : `${id}로 접근하는 것은 비정상적인 접근입니다.`})
    }
})

// * /write - 로그인시에만 활성화(생성, 수정) -> post값은 /blog로
router.post('/', (req, res, next) => {
    const id = blogs.length + 1;
    const title = req.body.title; // const {key1, key2...} = req.body;
    const content = req.body.content;
    const section = req.body.section;
    const pubDate = new Date().toString();
    const modDate = new Date().toString();
    // 둘 다 같을 때에는 하나 생략
    let blog = {id, title, content, section, pubDate, modDate};
    blogs.push(blog);
    res.status(201).json(blog); // 201은 create
    /*
    postman test data
    post : localhost:8080/blog
    post, body, raw, json, data(아래) 확인 후 send
    {
        "title" : "title4",
        "content" : "content4",
        "section" : "section4"
    }
    send 후 아래 url로 접속하면 4번이 들어와있는 것 확인
    localhost:8080/blog
    */
})

// 수정(PUT) : blog/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const blog = blogs.find(b => b.id == id)
    if (blog){ // 각각의 값이 비어있을 수도 있음
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.section = req.body.section;
        blog.modDate = new Date().toString();
        res.status(200).json(blogs);
    } else {
        res.status(404);
    }
    /*
    postman test data
    post : localhost:8080/blog
    put, body, raw, json, data(아래) 확인 후 send
    {
        "id" : 1, // 굳이 id가 들어가지 않아도 됨.
        "title" : "title1-수정",
        "content" : "content1-수정",
        "section" : "section1-수정"
    }
    응답값으로 바로 확인 가능
    */
})

// 삭제(DELETE) : blog/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    blogs = blogs.filter(b => b.id != id) 
    //아닌 것들만 묶어주거나 remove, splice를 사용해서 삭제, filter가 가장 깔끔
    res.status(200).json(blogs); //굳이 204를 보내줄거면 200로
    // postman test data
    // post : localhost:8080/blog/1
    // delete, body, raw, json, data(필요없음) 확인 후 send
})


module.exports = router;