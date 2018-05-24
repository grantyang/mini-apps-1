const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoModels = require('./mongo.js');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('GET CALLED');
});

app.post('/order', (req, res) => {
  let myData = new mongoModels.OrderModel(req.body) //create new Mongo document using userModel and res.body
  myData.save().then(mongoData => { //save that Mongo document to the database
    console.log('mongoData inserted, it is', mongoData)
    res.send(mongoData)
  })
  .catch(error => {
    res.status(400).send('error is', error)
  })
});

app.post('/account', (req, res) => {
  let myData = new mongoModels.AccountModel(req.body) //create new Mongo document using userModel and res.body
  myData.save().then(mongoData => { //save that Mongo document to the database
    console.log('mongoData inserted, it is', mongoData)
    res.send(mongoData)
  })
  .catch(error => {
    res.status(400).send('error is', error)
  })
});

app.post('/shipping', (req, res) => {
  let myData = new mongoModels.ShippingModel(req.body) //create new Mongo document using userModel and res.body
  myData.save().then(mongoData => { //save that Mongo document to the database
    console.log('mongoData inserted, it is', mongoData)
    res.send(mongoData)
  })
  .catch(error => {
    res.status(400).send('error is', error)
  })});

app.post('/payment', (req, res) => {
  let myData = new mongoModels.PaymentModel(req.body) //create new Mongo document using userModel and res.body
  myData.save().then(mongoData => { //save that Mongo document to the database
    console.log('mongoData inserted, it is', mongoData)
    res.send(mongoData)
  })
  .catch(error => {
    res.status(400).send('error is', error)
  })});

app.listen(1337, () => {
  console.log('Server listening on port 1337!');
});
