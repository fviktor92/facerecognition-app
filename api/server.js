const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');
const register = require("./controllers/register");
const signin = require('./controllers/signin');
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const auth = require('./controllers/authorization');
const morgan = require('morgan')

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users)});
app.post('/signin', signin.signInAuthentication(db, bcrypt));
app.post('/register', (req, res) => {register.handleRegister(req, res, db , bcrypt)});
app.get('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', auth.requireAuth, (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', auth.requireAuth, (req, res) => {image.handleApiCall(req, res)});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`);
});