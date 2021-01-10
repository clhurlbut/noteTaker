

const fs = require('fs');


module.exports = function (app) {
    // get request
    app.get('/api/notes', function (req, res) {
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            newData = JSON.parse(data);
            res.send(newData);
        });
    });
    // post request 
    app.post('/api/notes', function (req, res) {
        const newNotes = req.body;
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            newData = JSON.parse(data);
            newData.push(newNotes);
            let noteId = 1;
            newData.forEach((note) => {
                note.id = noteId;
                noteId++;
                return newData;
            });
            console.log(newData);
            newDataString = JSON.stringify(newData);
            fs.writeFile('./db/db.json', newDataString, (err, data) => {
                if (err) throw err;
            });
        });
        res.send('Your note has been received!');

    });
};