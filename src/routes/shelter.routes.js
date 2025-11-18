const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelter.controller');

// POST /api/shelter - create
router.post('/', shelterController.createShelter);

// GET /api/shelter - list
router.get('/', shelterController.getAllShelters);

// GET /api/shelter/:id - get by id
router.get('/:id', shelterController.getShelterById);

// PUT /api/shelter/:id - update
router.put('/:id', shelterController.updateShelter);

// DELETE /api/shelter/:id - delete
router.delete('/:id', shelterController.deleteShelter);

module.exports = router;
