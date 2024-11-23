const dotenv = require('dotenv').config()
const express = require('express')
const { dbconnect } = require('./config/dbconnect')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')

const app = express()

// db connection-
dbconnect()

// middlewares-
app.use(express.json())
// routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

// start server

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})