import express from "express"
import morgan from "morgan"
//import bodyParser from "body-parser"
//import { dirname } from "path"
//import { fileURLToPath } from "url"
//const __dirname = dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || 3000

const app = express()
app.use(express.urlencoded({ extended: true })) //req.body.name
app.use(express.static("public"))
app.use(bandNameGenerator)
// app.use(morgan("tiny"))
// app.use(logger)
var bandName = ""
function bandNameGenerator(req, res, next) {
  console.log(req.body)
  bandName = req.body["street"] + req.body["pet"]
  next()
}

function logger(req, res, next) {
  console.log("Request method: ", req.method)
  console.log("Request URL: ", req.url)
  next()
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit", (req, res) => {
  const street = req.body.street
  const pet = req.body.pet
  // res.send(`<h1>Your band name is:</h1><h2>${street}${pet}</h2>`)
  res.send(`<h1>Your band name is:</h1><h2>${bandName}</h2>`)
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log(`Listening on port ${port}.`)
})
