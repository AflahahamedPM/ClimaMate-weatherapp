import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import route from "./routes/router.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())
app.use("/",route)

app.listen(PORT,()=>{
    console.log(`server is listening to port: ${PORT}`);
})