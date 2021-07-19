// This is the server providing the data API and hosting the web files
// The server uses ExpressJS while the database is provided by LokiJS. 
// Loki is entirely in-memory with a file based persistance. It's usage here
// if primarily illustrative as usually you would want a server-based solution.

// Unlike Vue, these files are not passed through Babel and run directly by Node.
// We can use newer JS capabilities supported by Node, but modules tend to be imported
// using require from CommonJS
const express = require('express');
const loki = require('lokijs');

// Create an express application
const app = express();

// Create a notes database. It will be saved as "notes.db" on disk, call "start" when ready,
// and save every 5 seconds if something has changed.
const db = new loki('notes.db', {
	autoload: true,
	autoloadCallback: start,
	autosave: true,
	autosaveInterval: 5000
});
// This will be our notes collection
let notes;

// Configure our express application to support JSON bodies. See Express middleware and body-parser for more information.
app.use(express.json());

// Configure express to host any files and directories located in the 'public' folder. 
app.use(express.static('public'));

// Here we start setting up our routes
// This sets up a GET route so if the browser goes to http://server:3000/notes, it will get a JSON response (res.json) with the notes from the database.
app.get('/notes', function (req, res) {
	res.json({ notes: notes.find() });
});

// Here we setup a PUT call for updating a note. Traditionally PUT is idempotent while POST is not, so use PUT to update a document, POST to create new.
// Note that req.body is populated with the JSON object that's coming from the browser. Typically we would do error checking about the contents of the object
// rather than blindly allowing storage.
app.put('/notes', function (req, res) {
	notes.update(req.body);
	res.json(notes.get(req.body.$loki));
});

app.post('/notes', function (req, res) {
	res.json(notes.insert({
		title: req.body.title
	}));
});

app.delete('/notes', function (req, res) {
	notes.remove(req.body);
	res.json({ notes: notes.find() });
});

// This "start" function occurs after the database is loaded. We start everything in here as we don't want to have the website available
// until the database is ready.
function start() {
	// Initial the database if it didn't already exist
	dbInit();

	// Start listening on port 3000. 
	app.listen(3000, () => {
		console.log('App is now listening on port 3000');
	});
}

// A simple initialization scheme. See if the collection
// exists, and if not create it.
function dbInit() {
	notes = db.getCollection('notes');
	if (notes === null) {
		notes = db.addCollection('notes');
	}
}