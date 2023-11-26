import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync("api.proto", {})
const hostPackage = grpc.loadPackageDefinition(packageDef).hostApi

const client = new hostPackage.Host(process.env.host, grpc.credentials.createInsecure())

export default client
