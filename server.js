const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const jsmediatags = require("jsmediatags");

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './music');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/signin/", (req, res) => {
    res.sendFile(path.join(__dirname, "signin/index.html"));
});

app.get("/script.js", (req, res) => {
    res.sendFile(path.join(__dirname, "script.js"));
});

app.get("/songs.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "songs.txt"));
});

app.get("/meta.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "meta.txt"));
});

app.use('/music', express.static(__dirname + '/music'));
app.use('/upload', express.static(__dirname + '/upload'));
app.use('/signin', express.static(__dirname + '/signin'));

app.post('/single', upload.single('image'), (req, res) => {
    var host = req.hostname;
    console.log(req.file);
    var fileName = req.file.originalname;
    res.send(`Single File upload success file now located at https://${host}/music/${fileName}`);
    fs.readFile('songs.txt', function (err, data) {
        if (err) throw err;
        if (data.includes(fileName)) {
            console.log('already saved!')
        } else {
            fs.appendFile('songs.txt', `https://${host}/music/${fileName}\n`, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            const file = req.files;
            jsmediatags.read(file, {
                onSuccess: function (tag) {

                    // Array buffer to base64
                    const data = tag.tags.picture.data;
                    const format = tag.tags.picture.format;
                    let base64String = "";
                    for (let i = 0; i < data.length; i++) {
                        base64String += String.fromCharCode(data[i]);
                    }

                    // Output media tags
                    var metaData = {};
                    metaData['cover'] = `url(data:${format};base64,${window.btoa(base64String)})`;

                    metaData['title'] = tag.tags.title;
                    metaData['artist'] = tag.tags.artist;
                    metaData['albu'] = tag.tags.album;
                    metaData['genre'] = tag.tags.genre;
                },
                onError: function (error) {
                    console.log(error);
                }
            })
            fs.appendFile('meta.txt', metaData, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        };
    })
})

app.post('/multiple', upload.array('songs'), (req, res) => {
    console.log(req.files)
    res.send(`Multitple Files Upload Success`)
});


app.use(express.static(__dirname + "/../music"));


app.listen(3000);