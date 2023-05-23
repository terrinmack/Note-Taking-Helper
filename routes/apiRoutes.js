const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    // API GET req
    app.get("/api/notes", (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        res.json(data);
    });


    // API POST req
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        console.log("Successfully added new note!");

        res.json(data);
    });


    // API DELETE req
    app.delete("/api/notes/:id", (req, res) => {
        let noteId = req.params.id.toString();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newData = data.filter( note => note.id.toString() !== noteId );
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        console.log(`Successfully deleted note with id : ${noteId}`);

        res.json(newData);
    });
};