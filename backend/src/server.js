const express = require('express')
const routes = require('./routes.js')
const cors = require('cors')

require('dotenv').config()
require('./database')

const app = express()
app.use(cors()) //Cors utilization for Heroku Deploy
app.listen(process.env.PORT || 3000)  //.env PORT config for Heroku Deploy
app.use(express.json())
app.use(routes)