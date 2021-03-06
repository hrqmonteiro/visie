const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const feedRoutes = require('./routes/feed')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/feed', feedRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode
  const message = error.message
  res.status(status).json({ message: message })
})

mongoose
  .connect(
    'mongodb+srv://henriquemonteiro:aGVucmlxdWVt@cluster0.sughe.mongodb.net/pessoas?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
