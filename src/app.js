const express = require('express');

const adoptionApplicationRoutes = require('./routes/adoptionApplication.routes');
const petRoutes = require('./routes/pet.routes');
const shelterRoutes = require('./routes/shelter.routes');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Base route for adoption applications
app.use('/api/adoption-applications', adoptionApplicationRoutes);

// Base route for pets
app.use('/api/pets', petRoutes);
app.use('/api/shelter', shelterRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Exporting app to be used in tests or a separate server file
module.exports = app;
