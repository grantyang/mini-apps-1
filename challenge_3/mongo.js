const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shoppingCart');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to shopping database!!!');
});

var ordersSchema = new mongoose.Schema({
  //instantiate schema to check types of models
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  address1: String,
  address2: String,
  state: String,
  shippingZip: String,
  phone: String,
  creditCard: String,
  expiration: String,
  cvv: String,
  billingZip: String
});

var accountSchema = new mongoose.Schema({
  //instantiate schema to check types of models
  firstName: String,
  lastName: String,
  password: String,
  email: String
});

var shippingSchema = new mongoose.Schema({
  //instantiate schema to check types of models
  address1: String,
  address2: String,
  state: String,
  shippingZip: String,
  phone: String
});

var paymentSchema = new mongoose.Schema({
  //instantiate schema to check types of models
  creditCard: String,
  expiration: String,
  cvv: String,
  billingZip: String
});

var models = {
  AccountModel: mongoose.model('account', accountSchema),
  ShippingModel: mongoose.model('shipping', shippingSchema),
  PaymentModel: mongoose.model('payment', paymentSchema),
  OrderModel: mongoose.model('order', ordersSchema)
};

module.exports = models; //export models for use by other files
