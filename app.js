const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
require('dotenv/config')

app.use(express.json())

// routes
const postRoutes = require('./routes/posts')
app.use('/posts', postRoutes)

// Connect to DB via mongoose
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => console.log('Connected to DB...')
)

// Start up the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))