const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db.js');
const routes = require('./routes/routes.js')
const admin = require('firebase-admin');
const cred = require('./service-account.json')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))

app.listen(3050, () => console.log('Server started at port : 3000'));

app.use('/employees', routes);