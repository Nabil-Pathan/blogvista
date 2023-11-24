import express from "express"
import dotenv from "dotenv"
import {connectDb} from "./db/db.js"
const app = express()
import authRoutes from "./routes/authRoutes.js"
import blogPostRoutes from "./routes/blogPostRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
import path from "path"

app.use(cors())
dotenv.config()

const Port = process.env.PORT

connectDb()


app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/blog" ,blogPostRoutes )
app.use("/api/user", userRoutes)

const __dirname1 = path.resolve()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,"/client/build")))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"client","build","index.html"))
    })
}

else{
    app.get("/", (req,res)=>{
      res.send("API Running Successfully")
    })
  }

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.listen(Port , ()=>{
    console.log(`Server started on Port ${Port}`);
})