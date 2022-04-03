const router = require('express').Router()
const mysql = require('mysql')
const bcrypt = require('bcryptjs')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT // port 8889 is for mac
})

router.get('/login', (req, res) => {
    res.send('login page')
})

router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body

    db.query(`SELECT email FROM users WHERE email = '${email}'`, async (err, result) => {
        if (err) {
            return console.log(err)
        }

        if (result.length > 0) {
            return res.send('email already exists')
        } else if (password !== confirm_password) {
            return res.send('passwords do not match')
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        db.query(`INSERT INTO users SET ?`, { first_name, last_name, email, password: hashedPassword, confirm_password: hashedPassword }, (err, result) => {
            if (err) {
                return console.log(err)
            }
            res.json({
                message: 'user created',
                payload: result
            })
        })
    })
})

module.exports = router;