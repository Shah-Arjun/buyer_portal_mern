const express = require('express')
const dotenv = require('dotenv')


const app = express()
dotenv.config()


// MIDDLEWARE
app.use(express.json());  
app.use(express.urlencoded({extended: true}))  


//test api
app.use('/', (req, res) => {
    res.send("This is home page")
})




// LISTEN SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})