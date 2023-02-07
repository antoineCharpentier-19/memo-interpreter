const express = require('express')
const fs = require('fs')
const cors = require('cors');


const app = express()
const port = 3000

const notesRoot = '/Users/achar/Library/Mobile Documents/iCloud~md~obsidian/Documents/Mine/Notes/'

var notes = [];

app.use(cors({origin: '*'}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
next();});

app.get('/', (req, res) => {
  readYears();
  res.send(notes);
})




app.listen(port, () => {
})


function readYears() {
    notes = [];
    fs.readdirSync(notesRoot).forEach(file => {
        // if name is fully numeric, it's a month
        if (!isNaN(file)) {
            readYear(notesRoot+'/'+file);
        }
    })
}

function readYear(year) {
    fs.readdirSync(year).forEach(file => {
        // if name is fully numeric, it's a month
        if (!isNaN(file)) {
            readMonth(year+'/'+file);
        }
    })
}

function readMonth(month) {
    fs.readdirSync(month).forEach(file => {
        // format is like : "2022-12-26 - Mon.md" and we want to extract 2022-12-26
        if (file.match(/\d{4}-\d{2}-\d{2} - .*\.md/)) {
            readDay(month+'/'+file);
        }
    })
}

function readDay(path) {
    const date = path.match(/\d{4}-\d{2}-\d{2}/)[0];
    // split date and extract year, month, day
    const [year, month, day] = date.split('-');

    const file = fs.readFileSync(path, 'utf8');

    // for each line, check if it's a heading (format is "- hh:mm note")
    const lines = file.split('\n');
    lines.forEach(line => {
        if (line.match(/- \d{2}:\d{2}/)) {
            const note = line.split('- ')[1].split(' ').slice(1).join(' ');
            // split then extract hours and minutes
            const [hours, minutes] = line.match(/\d{2}:\d{2}/)[0].split(':');
            notes.push({
                date: new Date(year, month - 1, day, hours, minutes),
                note: note.indexOf('^') != -1 ? note.split('^').slice(0, -1).join('^') : note
            });
        }
    });
}
