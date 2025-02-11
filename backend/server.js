import express from'express'
import dotenv from'dotenv'
import connectDB from "./config/db.js"
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
//routes
import userRoute from "./routes/userRoutes.js"
import bookRoute from './routes/bookRoutes.js'
import uploadRoute from "./routes/uploadRoute.js"

//app
const app =express()
const __dirname = path.resolve();

//configurations
dotenv.config()

//cors
app.use(cors())
//connection
connectDB()

app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/books" ,bookRoute)
app.use("/api/upload",uploadRoute)


//make uploads folder static
app.use('/uploads' , express.static(path.join(__dirname , '/uploads')))

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.get("/" ,(req,res)=>{
    res.send("hello")
})

//port
const PORT =process.env.PORT || 5000
app.listen(PORT , console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))