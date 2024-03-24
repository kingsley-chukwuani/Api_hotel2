# Room Booking System

This Node.js application provides a simple backend for managing rooms, users, and their types. It utilizes Express.js for handling HTTP requests, MongoDB for database storage, and Joi for request validation.

## Features

- **Authentication Middleware:**
  - `auth` middleware ensures that only authenticated users can access certain routes.
  - `admin` middleware restricts access to admin-specific routes.

- **Validation Middleware:**
  - Requests to create or update users are validated against a predefined schema using the `validate` middleware.

- **Routes:**
  - `/api/v1/rooms-types`: CRUD operations for room types.
  - `/api/v1/rooms`: CRUD operations for rooms.
  - `/api/v1/users`: CRUD operations for users.

## Prerequisites

- Ensure you have Node.js and MongoDB installed on your system.
- Create a `.env` file and set the `Database_URI` variable to your MongoDB connection string.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

## Usage

- **Authentication:**
  - Obtain a JWT token by authenticating with valid credentials. Use the token in subsequent requests for authentication.

- **Endpoints:**
  - Access different endpoints for managing room types, rooms, and users.
  - Ensure you have the necessary permissions (admin or user) to perform certain actions.

## Example

```javascript
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
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests for any enhancements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).
