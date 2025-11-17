const express = require('express');
const router = express.Router();
const adopterController = require('../controllers/adopter.controller');

// POST /api/pets - create
router.post('/', adopterController.createAdopter);

// GET /api/pets - list
router.get('/', adopterController.getAllAdopters);

// GET /api/pets/:id - get by id
router.get('/:id', adopterController.getAdopterById);

// PUT /api/pets/:id - update
router.put('/:id', adopterController.updateAdopter);

// DELETE /api/pets/:id - delete
router.delete('/:id', adopterController.deleteAdopter);

module.exports = router;
