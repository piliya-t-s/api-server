import express from 'express'
import 'dotenv/config'
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import cors from 'cors'

const packageDef = protoLoader.loadSync("api.proto", {})
const hostPackage = grpc.loadPackageDefinition(packageDef).hostApi

const client = new hostPackage.Host(process.env.HOST, grpc.credentials.createInsecure())

const app = express()
app.use(cors())

app.post('/room/', function(req, res) {
    let id = Date.now().toString().slice(-5)


    client.createRoom({
        "id": id,
        "secret": "test",
        "isPublic": true
    }, (err, response) => {
        if(!err){
            res.json({"id": response.id})
        } else {
            res.send(JSON.stringify(err))
        }
    })
})


app.listen(80, () => {
    console.log(`Example app listening on port ${80}`)
})
  

