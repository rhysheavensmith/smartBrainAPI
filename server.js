const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'rhysheaven-smith',
      password : '',
      database : 'smart-brain'
    }
  });

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.listen(3000, () => {
    console.log('app is running on port 3000');
})












