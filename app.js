require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const auth = require('./middlewares/auth');
const admin = require('./middlewares/admin');
const validate = require('./middlewares/validate');
const roomTypeRoutes = require('./Routes/roomTypes');
const roomRoutes = require('./Routes/rooms');
const userRoutes = require('./Routes/users');

const app = express();

const crypto = require('crypto');

const data = 'ee95d9e644768b28f8e6712f6bfb48ba7f5b17f4f83d8f54e2da7cae92d006847a376fd10ba8062a2fa9ca2d4f96e40ab61839173ff4bb27fb02df9766617a70';
const hash = crypto.createHash('sha512');
hash.update(data);

console.log(hash.digest('hex'));

mongoose.connect(process.env.Database_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  roles: Joi.array().items(Joi.string()),
});

app.use(express.json());
app.use('/api/v1/rooms-types', [auth, admin], roomTypeRoutes);
app.use('/api/v1/rooms', auth, roomRoutes);
app.use('/api/v1/users', validate(schema), userRoutes);



app.listen(5000, () => console.log('Server started on port 5000'));