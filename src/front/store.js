import { People } from './pages/People/People.jsx'
export const initialStore = () => {
	return {
		"slug": "chanchitoFeliz",
		"contacts": []
	}
}


const CRUD = {
	update_contact: (state, action) => {
		return { ...state, contacts: action.payload }
	},
}

export default function storeReducer(store, action = {}) {
	return (CRUD[action.type] || (() => store))(store, action)
}


const d = {
	People: {
		"name": "Darth Vader",
		"gender": "male",
		"skin_color": "white",
		"hair_color": "none",
		"height": "202",
		"eye_color": "yellow",
		"mass": "136",
		"homeworld": "https://www.swapi.tech/api/planets/1",
		"birth_year": "41.9BBY",
		"url": "https://www.swapi.tech/api/people/4"
	},
	vehicle: {
		"name": "T-16 skyhopper",
		"consumables": "0",
		"cargo_capacity": "50",
		"passengers": "1",
		"max_atmosphering_speed": "1200",
		"crew": "1",
		"length": "10.4 ",
		"model": "T-16 skyhopper",
		"cost_in_credits": "14500",
		"manufacturer": "Incom Corporation",
		"vehicle_class": "repulsorcraft",
		"url": "https://www.swapi.tech/api/vehicles/6"
	},
	planets: {
		"name": "Tatooine",
		"climate": "arid",
		"surface_water": "1",
		"diameter": "10465",
		"rotation_period": "23",
		"terrain": "desert",
		"gravity": "1 standard",
		"orbital_period": "304",
		"population": "200000",
		"url": "https://www.swapi.tech/api/planets/1"
	},
}

