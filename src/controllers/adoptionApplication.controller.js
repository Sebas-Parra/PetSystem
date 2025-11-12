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

module.exports = { getAllAdoptionApplications, createAdoptionApplication };
