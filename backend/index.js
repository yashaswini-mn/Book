import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import { Book } from "./models/bookModel.js"
import bookRoutes from "./routers/bookRoutes.js"
import cors from "cors"
const app = express();
import mongoose from "mongoose";

app.use(express.json())
app.use(cors())

//To allow custom origins
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:['Content-Type']
// }))
app.use('/books',  bookRoutes)

mongoose.connect(mongoDBURL).
then(()=>{
console.log("MongoDb conneceted sucessfully")
app.listen(PORT, ()=>{
    console.log(`App is listening  to port: ${PORT}`)
})
})
.catch((error)=>{
console.log(`There is a problem connecting with MongoDB): ${error}`)
})