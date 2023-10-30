const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport')

// init
const app = express()

// Form data middleware
app.use(bodyParse.urlencoded({
    extended: false
}))

// Json body middleware
app.use(bodyParse.json())

app.use(cors())

// setting static directory
app.use(express.static(path.join(__dirname, 'public')))

// user passport middleware
app.use(passport.initialize())
// JWT Strartegy
require('./config/passport')(passport)


// Connect to DB
const db = require('./config/keys').mongo_uri
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.error(`Unable to connect with the database ${err}`)
})

app.get('/', (req, res) => {
    return res.send('api')
})

const users = require('./routes/api/users')
app.use('/api/users', users)

const sms = require('./routes/api/sms')
app.use('/api/sms', sms)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})