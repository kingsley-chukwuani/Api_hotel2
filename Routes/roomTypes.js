const express = require('express');
const router = express.Router();
const RoomType = require('../models/RoomType');

router.post('/', async (req, res) => {
  const roomType = new RoomType(req.body);
  await roomType.save();
  res.status(201).send(roomType);
});

router.get('/', async (req, res) => {
  const roomTypes = await RoomType.find();
  res.send(roomTypes);
});

module.exports = router;