const express = require('express')
const cors = require('cors')
const app = express()

app.get('/with-cors', cors(), (req, res, next) => {
  res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
})

const server = app.listen(3000, () => {
    console.log('Listening on port %s', server.address().port)
  })