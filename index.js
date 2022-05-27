const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(morgan("dev"))
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())

// app.use("/api", authRoutes)
fs.readdirSync("./routes").map(r => app.use("/api",require("./routes/" + r)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));