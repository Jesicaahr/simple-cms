require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000;
const routes = require('./routes')
const cors = require('cors')
const errorHandling = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandling)

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))