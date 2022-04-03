const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({
    path: './.env'
})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT // port 8889 is for mac
})

db.connect(function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log('Connected to database')
    }
})

const app = express()
app.use(express.json())

//Routes
const authRoutes = require('./routes/auth/auth.js')

app.use('/api/v1', authRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000')
})