// src/controllers/shelter.controller.js

// "Base de datos" en memoria
const shelters = [];
let nextId = 1;

function reset() {
  shelters.length = 0;
  nextId = 1;
}

function createShelter(req, res) {
  const data = req.body;

  // Validación mínima
  if (!data || !data.nombre) {
    return res.status(400).json({ message: 'Nombre es requerido' });
  }

  const shelter = {
    id: nextId++,
    nombre: data.nombre || null,
    direccion: data.direccion || null,
    telefono: data.telefono || null,
    email: data.email || null,
  };

  shelters.push(shelter);
  return res.status(201).json(shelter);
}

function getAllShelters(req, res) {
  return res.json(shelters);
}

function getShelterById(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const shelter = shelters.find(s => s.id === id) || null;
  if (!shelter) {
    return res.status(404).json({ message: 'Shelter no encontrado' });
  }

  return res.json(shelter);
}

function updateShelter(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const shelter = shelters.find(s => s.id === id) || null;
  if (!shelter) {
    return res.status(404).json({ message: 'Shelter no encontrado' });
  }

  const fields = ['nombre', 'direccion', 'telefono', 'email'];
  fields.forEach(f => {
    if (Object.prototype.hasOwnProperty.call(req.body, f)) {
      shelter[f] = req.body[f];
    }
  });

  return res.json(shelter);
}

function deleteShelter(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const index = shelters.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Shelter no encontrado' });
  }

  shelters.splice(index, 1);
  return res.status(204).send();
}

module.exports = {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter,
  reset,
};
