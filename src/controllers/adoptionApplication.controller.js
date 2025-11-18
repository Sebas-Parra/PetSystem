//datastore in memory for adoption applications
let adoptionApplications = [];

//returns all stored adoption applications
function getAllAdoptionApplications(req, res) {
  res.json(adoptionApplications);
}

//creates a new adoption application if valid date, status and comments are provided
function createAdoptionApplication(req, res) {
    const { applicantdate, statusAdoption, comments } = req.body;
    if (!applicantdate || !statusAdoption || !comments) {
        return res.status(400).json({ message: 'applicantdate, statusAdoption and comments are required' });
    }

    //creates a new adoption application object
    const newApplication = { 
        id: Date.now(), 
        applicantdate, 
        statusAdoption, 
        comments 
    };

    // adds it to the adoption applications array
    adoptionApplications.push(newApplication);

    //responds with the created adoption application
    res.status(201).json(newApplication);
}

//update a adoption application
function updateAdoptionApplication(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const { applicantdate, statusAdoption, comments } = req.body;
    if (!applicantdate || !statusAdoption || !comments) {
        return res.status(400).json({ message: 'applicantdate, statusAdoption and comments are required' });
    }

    const appIndex = adoptionApplications.findIndex(app => app.id === id);
    if (appIndex === -1) {
        return res.status(404).json({ message: 'Adoption application not found' });
    }

    adoptionApplications[appIndex] = { id, applicantdate, statusAdoption, comments };
    res.json(adoptionApplications[appIndex]);
}

//delete adoption application by id (not used in routes but could be useful)
function deleteAdoptionApplication(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const appIndex = adoptionApplications.findIndex(app => app.id === id);
    if (appIndex === -1) {
        return res.status(404).json({ message: 'Adoption application not found' });
    }

    adoptionApplications.splice(appIndex, 1);
    res.status(204).send();
}

// Get adoption application by ID
function getAdoptionApplicationById(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const application = adoptionApplications.find(app => app.id === id);
    if (!application) {
        return res.status(404).json({ message: 'Adoption application not found' });
    }

    res.json(application);
}


module.exports = { getAllAdoptionApplications, createAdoptionApplication, updateAdoptionApplication, deleteAdoptionApplication, getAdoptionApplicationById };
