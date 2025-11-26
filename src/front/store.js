import apiRequest from './apiRequest.js'
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
	add_contact: (store, action) => {
		console.log("Añadiendo Tarea")
		return store;
	},
	delete_contact: (store, action) => {
		console.log("eliminando tarea")
		return store;
	},
	edit_contact: (store, action) => {
		console.log("editando tarea")
		return store;
	},
}

export default function storeReducer(store, action = {}) {
	return (CRUD[action.type] || (() => store))(store, action)
}