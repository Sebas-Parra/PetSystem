const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');

// POST /api/pets - create
router.post('/', petController.createPet);

// GET /api/pets - list
router.get('/', petController.getAllPets);

// GET /api/pets/:id - get by id
router.get('/:id', petController.getPetById);

// PUT /api/pets/:id - update
router.put('/:id', petController.updatePet);

// DELETE /api/pets/:id - delete
router.delete('/:id', petController.deletePet);

module.exports = router;
