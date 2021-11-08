const router = require('express').Router()
let db = require('../db/db.json')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'))
})

router.post('/notes', (req, res) => {
  console.log('req.body', req.body)
// destructuring the req.body to get the title and text
  const { title, text } = req.body

  // creating a new note with the title, text, and now a new ID using UUID
  const newNote = {
    title,
    text,
    id: uuidv4(),
  }

  console.log('newNote', newNote)

  // here were telling fs. to READ the DB file.
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
    if (err) throw err
    // Were parsing the notes so we can work with them
    const parsedNotes = JSON.parse(data)
    console.log('parsed NOTES before we push the new note', parsedNotes)
    // pushing the newNote to the parsed notes array which is just the notes from the DB
    parsedNotes.push(newNote)
    console.log('parsed NOTES AFTER we push the new note', parsedNotes)

    // after we push the newNote to parsedNotes array we now need to write the new parsedNotes array back to the DB file.
    fs.writeFile(
      path.join(__dirname, '../db/db.json'),
      // here we are stringifying so it will properly format back in the DB file.
      JSON.stringify(parsedNotes),
      (err) => {
        if (err) throw err
        console.log('Saved Note to DB')
      },
    )

    // then we are sending the new updated DB file to the front end so you can see the new note that was just saved.
    res.sendFile(path.join(__dirname, "../db/db.json"))
  })

  

})



module.exports = router
