const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Room = mongoose.model('Room', roomSchema);

const roomsData = [
  {
    name: 'Deluxe Room',
    price: 20000
  },
  {
    name: 'Standard Room',
    price: 10000
  },
  {
    name: 'Economy Room',
    price: 5000,
  }
];

Room.create(roomsData)
  .then(() => console.log('Rooms created successfully'))
  .catch(err => console.error(err));

module.exports = Room;