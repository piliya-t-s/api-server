import express from 'express'
import client from './client.js'
import e from 'express';

const app = express()

app.post('/room/', function(req, res) {
    let id = Date.now().toString().slice(-5)

    client.createRoom({
        "id": "123",
        "secret": "test",
        "isPublic": true
    }, (err, response) => {
        if(!err){
            res.send(`https://api.mtsound.ru/rooms/${response.id}`);
        } else {
            res.send(JSON.stringify(err))
        }
    })
})



