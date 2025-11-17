const adopters = [];
let nextId = 1; 

function reset() {  
  adopters.length = 0;
  nextId = 1;
}

//Crear adoptante: POST
function createAdopter(req, res) {
  const data = req.body;

  if (!data || !data.nombreCompleto) {
    return res.status(400).json({ message: 'Nombre es requerido' });
  }

  const adopter = {
    id: nextId++,
    nombreCompleto: data.nombreCompleto || null,
    dni: data.dni || null,
    telefono: data.telefono || null,
    email: data.email || null,
    direccion: data.direccion || null,
  };

  adopters.push(adopter);
  return res.status(201).json(adopter);
}

//Obtener adoptantes: GET
function getAllAdopters(req, res) {
  return res.json(adopters);
}

//Obtener adoptante por id: GET by id
function getAdopterById(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const adopter = adopters.find(a => a.id === id) || null;
  if (!adopter) {
    return res.status(404).json({ message: 'Adoptante no encontrado' });
  }

  return res.json(adopter);
}

//Actualizar adoptante: PUT by id
function updateAdopter(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const adopter = adopters.find(a => a.id === id) || null;
  if (!adopter) {
    return res.status(404).json({ message: 'Adoptante no encontrado' });
  }

  const fields = ['nombreCompleto', 'dni', 'telefono', 'email', 'direccion'];
  fields.forEach(f => {
    if (Object.prototype.hasOwnProperty.call(req.body, f)) {
      adopter[f] = req.body[f];
    }
  });

  return res.json(adopter);
}

//Eliminar adoptante por id: DELETE by id
function deleteAdopter(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const index = adopters.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Adoptante no encontrado' });
  }

  adopters.splice(index, 1);
  return res.status(204).send();
}

module.exports = {
  createAdopter,
  getAllAdopters,
  getAdopterById,
  updateAdopter,
  deleteAdopter,
  reset,
};
