const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Confing
const db = require('./config/keys.js').mongoURI;

// Connect to MognoDb
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {console.log("Connected to MongoDB!")})
  .catch((err) => {console.log(err)});

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport.js')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
