//express interact with the front end
const express = require('express')
// path for filename
const path = require('path')
//fes reed and write the files
const fs = require('fs')
const apiRoutes = require("./routes/apiRoutes")

const app = express()
const PORT = process.env.PORT || 3001

//Creating Middleware for parsing JSON and urlencoded form data
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use("/api", apiRoutes)

// Get route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')),
)
// Get route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')),
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`),
)
