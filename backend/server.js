const express = require('express')
const dotenv = require('dotenv')
const ConnectDB = require('./db/db')


//routes import
const authRoutes = require('./routes/authRoutes')
const propertyRoutes = require('./routes/propertyRoutes')
const favouriteRoutes = require('./routes/favouriteRoutes')


const app = express()
dotenv.config()


const cors = require('cors');
app.use(cors({
  origin: "https://buyer-portal-mern.vercel.app",
  credentials: true
}));



//CALLING DB CONNECTION FUNCTION
ConnectDB()



// MIDDLEWARE
app.use(express.json());  
app.use(express.urlencoded({extended: true}))  


//test api
// app.use('/', (req, res) => {
//     res.send("This is home page")
// })

app.use('/api/auth', authRoutes)
app.use('/api/property', propertyRoutes)
app.use('/api/favourites', favouriteRoutes)



// LISTEN SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})