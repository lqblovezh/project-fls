const express = require('express')
const Mock = require('mockjs')
const app = express()
app.put(restUrl_publish+'/api/simp',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.put(restUrl_publish+'/api/books/:id',(req, res) => {
    res.json(Mock.mock({
        "status": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})


app.delete(restUrl_publish+'/api/simp',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.delete(restUrl_publish+'/api/books/:id',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.delete(restUrl_publish+'/api/nickname/:id',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})




app.get('/common/api/tasks',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.get(restUrl_publish+'/api/simp',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.get(restUrl_publish+'/api/simp/:id',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.get(restUrl_publish+'/api/books/:id',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.get(restUrl_publish+'/api/books',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.get(restUrl_publish+'/api/nickname',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})




app.post('/common/api/tasks',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})

app.post(restUrl_publish+'/api/simp',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
app.post(restUrl_publish+'/api/books',(req, res) => {
    res.json(Mock.mock({
        "status|1": true,
        "code|10000-30000": 10000,
        "messages|1-4" :"错误信息",
        "data|5" : "mock",
        "page": {
            "start":10,
            "offset":10,
            "total":100
        }
    }))
})
const server = app.listen(3000, () => {
    console.log('port='+ server.address().port)
})