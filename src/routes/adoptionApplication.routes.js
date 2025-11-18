const express = require('express');
const { getAllAdoptionApplications, createAdoptionApplication, updateAdoptionApplication, deleteAdoptionApplication, getAdoptionApplicationById } = require('../controllers/adoptionApplication.controller');

const router = express.Router();

// GET Route to get all adoption applications
router.get('/', getAllAdoptionApplications);

// POST Route to create a new adoption application
router.post('/', createAdoptionApplication);

// PUT Route to update an existing adoption application
router.put('/:id', updateAdoptionApplication);

// DELETE Route to delete an adoption application
router.delete('/:id', deleteAdoptionApplication);

// GET Route to get an adoption application by ID
router.get('/:id', getAdoptionApplicationById);

module.exports = router;

