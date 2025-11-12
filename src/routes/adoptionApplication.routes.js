const express = require('express');
const { getAllAdoptionApplications, createAdoptionApplication } = require('../controllers/adoptionApplication.controller');

const router = express.Router();

// GET Route to get all adoption applications
router.get('/', getAllAdoptionApplications);

// POST Route to create a new adoption application
router.post('/', createAdoptionApplication);

module.exports = router;