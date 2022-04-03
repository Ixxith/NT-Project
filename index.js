//Gives access to the express library
let express = require("express");
//creates an express application object
let app = express();
//use this variable for our port communication
let port = 3000;
//this gives access to the path
let path = require("path");
let ejs = require("ejs");

// knex.select("SongID", "SongName", "ArtistID", "YearReleased").from("Songs").orderBy("SongName").then(songs => {
 

//gives access to the body-parser library used in the req extracting 
//data from the request IOW the form 
let bodyParser = require("body-parser");

//allows us to use objects and arrays like JSON format
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//Require and import knex with sqllite3 and a database titled "MusicLibrary"
let knex = require("knex")({
    client : "sqlite3",
    connection : {
        filename: "./database.db"
    },
    useNullAsDefault: true
})

//
app.use(express.static(__dirname + '/public'));

// Called when the main directory of the webpage is called
app.get("/", (req,res) => {
 //Renders the database as a table sorted by SongName  
 knex('Situation').first().then(situation => {
   // Render the index ejs page, and send it all records in the Songs database
   knex('Answer').where('SituationId',situation.SituationId).then(answers => {
        res.render("index", {sObject: situation, aTable: answers});
    }).catch(err => {
        // If an error occurs, logit
        console.log(err);
        res.status(500).json({err});
    }); 
 }).catch(err => {
     // If an error occurs, logit
        console.log(err);
        res.status(500).json({err});
    });
});

// Called when the main directory of the webpage is called
app.get("/admin", (req,res) => {
    //Renders the database as a table sorted by SongName  
    knex('Situation').then(situations => {
      // Render the index ejs page, and send it all records in the Songs database
      knex('Answer').then(answers => {
           res.render("admin", {sTable: situations, aTable: answers});
       }).catch(err => {
           // If an error occurs, logit
           console.log(err);
           res.status(500).json({err});
       }); 
    }).catch(err => {
        // If an error occurs, logit
           console.log(err);
           res.status(500).json({err});
       });
   });

/* When DeleteSong is called as a post method along with a song ID, use the song ID to find the song,
 and then delete it*/
app.get('/Delete/:type/:id', (req,res) => {
    // Find the song and delete it
    knex(req.params.type).where(req.params.type+'Id',req.params.id).del().then(item => {
        // Refresh / Redirect to the main directory page
        res.redirect('/admin');
    }).catch(err => {
        // If an error happens, log it
        console.log(err);
        res.status(500).json({err});
    })
});


app.post('/add/:item', (req,res)=>{
    knex(req.params.item).insert(req.body).then(student => {
        res.redirect('/admin');
    });
});

//Display the port number for the node server
app.listen(port, function() {
    console.log("Node server running on Port " + port)
    console.log("http://localhost:"+port+'/') }
);

