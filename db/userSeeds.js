const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Info = require('../models/info');

User.collection.drop();
Info.collection.drop();

User
  .create([{
    username: 'arrianneoshea',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'james',
    password: '2309',
    passwordConfirmation: '2309'
  },{
    username: 'olivia',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'jack',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'bob',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'calvin',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'daniel',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'eric',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'fab',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'geri',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Info.create([{
      number: 2,
      children: 'No',
      pets: 'Yes',
      otherInfo: 'Seen a couple of times this week.',
      lat: '51.514672',
      lng: '-0.049094999999965694',
      createdBy: users[0]
    },{
      number: 1,
      children: 'Yes',
      pets: 'No',
      otherInfo: 'Worried that there is a child but have never seen them before so hopefully it is just a one off.',
      lat: '51.510238',
      lng: '-0.07467299999996158',
      createdBy: users[0]
    },{
      number: 2,
      children: 'No',
      pets: 'Yes',
      otherInfo: 'May have seen this pair before',
      lat: '51.512802',
      lng: '-0.061110999999982596',
      createdBy: users[0]
    },{
      number: 3,
      children: 'No',
      pets: 'Yes',
      otherInfo: '',
      lat: '51.517503',
      lng: '-0.09836199999995188',
      createdBy: users[1]
    },{
      number: 2,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.511093',
      lng: '-0.12119299999994837',
      createdBy: users[1]
    },{
      number: 2,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.516114',
      lng: '-0.13818700000001627',
      createdBy: users[1]
    },{
      number: 4,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.51809',
      lng: '-0.06222700000000714',
      createdBy: users[5]
    },{
      number: 1,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.521989',
      lng: '-0.04664900000000216',
      createdBy: users[5]
    },{
      number: 1,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.523751',
      lng: '-0.05939499999999498',
      createdBy: users[5]
    },{
      number: 3,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.50957',
      lng: '-0.08244000000001961',
      createdBy: users[6]
    },{
      number: 2,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.515339',
      lng: '-0.07690400000001318',
      createdBy: users[7]
    },{
      number: 2,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.520307',
      lng: '-0.08325600000000577',
      createdBy: users[7]
    },{
      number: 3,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.522683',
      lng: '-0.07999399999994239',
      createdBy: users[8]
    },{
      number: 2,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.526581',
      lng: '-0.07312799999999697',
      createdBy: users[8]
    },{
      number: 1,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.52821',
      lng: '-0.07990799999993214',
      createdBy: users[8]
    },{
      number: 5,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.529732',
      lng: '-0.06900799999993978',
      createdBy: users[8]
    },{
      number: 2,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.531441 ',
      lng: '-0.10149499999999989',
      createdBy: users[8]
    },{
      number: 1,
      children: 'No',
      pets: 'No',
      otherInfo: '',
      lat: '51.534697',
      lng: '-0.10973500000000058',
      createdBy: users[9]
    }]);
  })
  .then((info) => {
    console.log(`${info.length} info created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
