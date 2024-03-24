const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send(room);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, roomType, minPrice = 0, maxPrice } = req.query;
    const query = Room.find({
      name: new RegExp(search, 'i'),
      roomType: mongoose.Types.ObjectId(roomType),
      price: { $gte: minPrice, $lte: maxPrice || Infinity }
    }).populate('roomType');
    const rooms = await query.exec();
    res.send(rooms);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
    if (!room) {
      return res.status(404).send();
    }
    res.send(room);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;