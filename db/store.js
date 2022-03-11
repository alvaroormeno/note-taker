const util = require("util")
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store{

    read() {
        return readFileAsync("db/db.json", "utf-8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((notes) => {
            let newNote 
            try {
               newNote = [].concat(JSON.parse(notes)) 
            } catch (error) {
                newNote = []
            }
            return newNote
        })

    }
    addNote(note) {
        const {title, text} = note
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }
        const newnote = {title, text, id: uuidv4()}
        return this.getNotes().then((notes) => [...notes, newnote])
        .then((newUpadatedNotes) => this.write(newUpadatedNotes))
        .then(() => newnote)

    }
    removeNote(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((deletedNotes) => this.write(deletedNotes))

    }
}

module.exports = new Store()