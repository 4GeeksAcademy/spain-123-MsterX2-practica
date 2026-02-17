import { People } from './pages/People/People.jsx'
export const initialStore = () => {
	return {
		"user": "chanchitoFeliz",
		"contacts": [],
		"isAuthenticated": false,
		"token": ""
	}
}


const CRUD = {
	update_contact: (store, action) => {
		return { ...store, contacts: action.payload }
	},
	LOGIN: (store, action) => {
		return { ...store, user: action.payload, isAuthenticated: true }
	},
	LOGOUT: (store, action) => {
		return { ...store, user: null, isAuthenticated: false }
	},
	SIGNUP: (store, action) => {
		return {
			...store, user: action.payload
			, isAuthenticated: true
		}
	},
	HANDLE_TOKEN: (store, action) => {
		return { ...store, token: action.payload }
	}
}

export default function storeReducer(store, action = {}) {
	return (CRUD[action.type] || (() => store))(store, action)
}
