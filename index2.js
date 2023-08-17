import express from "express"
const port = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: true })) //req.body.name
app.use(express.static("public"))
app.use(bandNameGenerator)

var bandName = ""

function bandNameGenerator(req, res, next) {
  console.log(req.body)
  bandName = req.body["street"] + req.body["pet"]
  next()
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}</h2>`)
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log(`Listening on port ${port}.`)
})
