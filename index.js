import express from 'express'
import 'dotenv/config'
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'


const packageDef = protoLoader.loadSync("api.proto", {})
const hostPackage = grpc.loadPackageDefinition(packageDef).hostApi

const client = new hostPackage.Host(process.env.HOST, grpc.credentials.createInsecure())

const app = express()

app.post('/room/', function(req, res) {
    let id = Date.now().toString().slice(-5)

    client.createRoom({
        "id": id,
        "secret": "test",
        "isPublic": true
    }, (err, response) => {
        if(!err){
            res.send(`https://api.mtsound.ru/room/${response.id}`);
        } else {
            res.send(JSON.stringify(err))
        }
    })
})


app.listen(80, () => {
    console.log(`Example app listening on port ${80}`)
})
  

