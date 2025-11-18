
const pets = [];
let nextId = 1;

function reset() {
	pets.length = 0;
	nextId = 1;
}

function createPet(req, res) {
	const data = req.body;
	if (!data || !data.nombre) {
		return res.status(400).json({ message: 'Nombre es requerido' });
	}

	if (!data || !data.especie) {
		return res.status(400).json({ message: 'Especie es requerida' });
	}
	const pet = {
		id: nextId++,
		nombre: data.nombre || null,
		edad: data.edad || null,
		especie: data.especie || null,
		raza: data.raza || null,
		sexo: data.sexo || null,
		estadoSalud: data.estadoSalud || null,
	};
	pets.push(pet);
	return res.status(201).json(pet);
}

function getAllPets(req, res) {
	return res.json(pets);
}

function getPetById(req, res) {
	const id = Number(req.params.id);
	if (Number.isNaN(id)) {
		return res.status(400).json({ message: 'ID inválido' });
	}
	const pet = pets.find(p => p.id === id) || null;
	if (!pet) { 
		return res.status(404).json({ message: 'Mascota no encontrada' });
	}
	return res.json(pet);
}

function updatePet(req, res) {
	const id = Number(req.params.id);
	if (Number.isNaN(id)) {
		return res.status(400).json({ message: 'ID inválido' });
	}
	const pet = pets.find(p => p.id === id) || null;
	if (!pet) { 
		return res.status(404).json({ message: 'Mascota no encontrada' });
	}
	const fields = ['nombre', 'edad', 'especie', 'raza', 'sexo', 'estadoSalud'];
	fields.forEach(f => {
		if (Object.prototype.hasOwnProperty.call(req.body, f)) {
			pet[f] = req.body[f];
		}
	});
	return res.json(pet);
}

function deletePet(req, res) {
	const id = Number(req.params.id);
	if (Number.isNaN(id)) {
		return res.status(400).json({ message: 'ID inválido' });
	}
	const index = pets.findIndex(p => p.id === id);
	if (index === -1) {
		return res.status(404).json({ message: 'Mascota no encontrada' });
	}
	pets.splice(index, 1);
	return res.status(204).send();
}

module.exports = {
	createPet,
	getAllPets,
	getPetById,
	updatePet,
	deletePet,
	reset,
};
