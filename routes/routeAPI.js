// dependencies
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
            // creating unique ID for each note 
            let noteId = 1;
            newData.forEach((note) => {
                note.id = noteId;
                noteId++;
                return newData;
            });
            newDataString = JSON.stringify(newData);
            // async write stringified data
            fs.writeFile('./db/db.json', newDataString, (err, data) => {
                if (err) throw err;
            });
        });
        res.send('Note received!')
    });

    //api delete request
    app.delete('/api/notes/:id', function (req, res) {
        const deleteNotes = req.params.id;
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            // targeting the unique id of the note to delete
            newData = JSON.parse(data);
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].id === Number(deleteNotes)) {
                    //use splice to remove a single given note 
                    newData.splice([i], 1);
                }
            }
            newDataString = JSON.stringify(newData);
            fs.writeFile('./db/db.json', newDataString, (err, data) => {
                if (err) throw err;
            });
        });
        //express response 204 
        res.status(204).send();
    });
};