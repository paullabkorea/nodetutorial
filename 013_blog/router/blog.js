const express = require('express');

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

router.get('/', (req, res, next) => {
    console.log(req.query);
    const section = req.query.section;
    const data = section ? blogs.filter(b => b.section === section) : blogs;
    res.render('post.html', {data}); // 수정 1 data:data와 같습니다. 둘 다 같을 경우 생략 가능해요.
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const blog = blogs.find(b => b.id == id); //타입이 number, string
    res.render('postdetails.html', {blog});
})

router.post('/', (req, res, next) => {
    const id = blogs.length + 1;
    const title = req.body.title; // const {key1, key2...} = req.body;
    const content = req.body.content;
    const section = req.body.section;
    const pubDate = new Date().toString();
    const modDate = new Date().toString();
    let blog = {id, title, content, section, pubDate, modDate};
    blogs.push(blog);
    res.status(201).json(blog); // 201은 create
})

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
})

// 삭제(DELETE) : blog/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    blogs = blogs.filter(b => b.id != id) 
    res.status(200).json(blogs); //굳이 204를 보내줄거면 200로
})


module.exports = router;
module.exports['blogs'] = blogs; // 좋은 방법은 아닙니다. DB 할 때 다시 리펙토링 해야합니다.