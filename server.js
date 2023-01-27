const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const login = "JLBrown222:26JAN%401306"  //move this to separate file and import it

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose.connect('mongodb://localhost:27017/GCD'); //connecting to local database
mongoose.connect(`mongodb+srv://${login}@cluster0.vit0cee.mongodb.net/GCD?retryWrites=true&w=majority`);  //connecting to live database

const characterSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  CharacterID: {
    type: Number,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  Height: {
    type: Number,
    required: true
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  Element: {
    type: String,
    enum: ['Earth', 'Fire', 'Wind', 'Water', 'Light', 'Dark'],
    required: true
  },
  Rarity: {
    type: String,
    enum: ['R', 'SR', 'SSR'],
    required: true
  },
  Specialty1: {
    type: String,
    enum: ['Sabre', 'Dagger', 'Spear', 'Axe', 'Staff', 'Gun', 'Melee', 'Bow', 'Harp', 'Katana'],
    required: true
  },
  Specialty2: {
    type: String,
    enum: ['Sabre', 'Dagger', 'Spear', 'Axe', 'Staff', 'Gun', 'Melee', 'Bow', 'Harp', 'Katana', 'None'],
    required: true
  },
  Style: {
    type: String,
    enum: ['Balanced', 'Attack', 'Defense', 'Heal', 'Special'],
    required: true
  },
  Type: {
    type: String,
    enum: ['Human', 'Erune', 'Draph', 'Harvin', 'Primal', 'Other'],
    required: true
  },
  Series: {
    type: String,
    enum: ['Premium Draw', 'Event', 'Summer', 'Yukata', 'Valentine', 'Halloween', 'Holiday', '12 Generals', 'Grand', 'Fantasy', 'Tie-In', 'Eternals', 'Evokers'],
    required: true
  }
});

const Character = mongoose.model('Character', characterSchema);  //the first argument in the model parethesis is the singular form of what collection you're writing to, in this case: 'Characters', plural

app.get('/', function(req, res) {
  Character.find({}, function(err, results){
    res.render("home", {characterArray: results});
  }).sort({Name: 'asc'});

});

app.listen(3000, function() {
  console.log("Listening: 3000")
});
app.get('/characterEntry', function(req, res) {
  res.sendFile(__dirname + '/characterEntry.html')
});
app.post('/characterEntry', function(req, res) {
  console.log(req.body);
  // const character = mongoose.model('Character', characterSchema);  //the first argument in the model parethesis is the singular form of what collection you're writing to, in this case: 'Characters', plural
  const newCharacter = new Character({
    Name: req.body.cName,
    CharacterID: req.body.cID,
    Age: req.body.cAge,
    Height: req.body.cHeight,
    Gender: req.body.cGender,
    Element: req.body.cElement,
    Rarity: req.body.cRarity,
    Specialty1: req.body.cSpecialty1,
    Specialty2: req.body.cSpecialty2,
    Style: req.body.cStyle,
    Type: req.body.cType,
    Series: req.body.cSeries,
  });
  newCharacter.save();
  res.redirect('/')
});


//testing area

//tested in postman and this seems to work.  Will stay here in test area until I'm certain this is how the final code will work.
app.get("/api/:charID", function(req,res) {
  Character.find({CharacterID: req.params.charID}, function(err, results) {
    res.json(results)
  })
}) 

//testing area