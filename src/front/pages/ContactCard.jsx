// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { Contact } from "../components/Contact";
import { useEffect } from "react";
import apiRequest from "../apiRequest";



export const ContactCard = () => {
	// Access the global state and dispatch function using the useGlobalReducer hook.
	const { store, dispatch } = useGlobalReducer()
	const getContacts = async () => {
		const data = await apiRequest(
			"https://playground.4geeks.com/contact",
			"/agendas/chanchitoFeliz",
			"GET"
		)
		dispatch({ type: "update_contact", payload: data.contacts })
	}
	useEffect(
		() => {
			getContacts()
		},
		[]
	)

	return (
		<>
			<button onClick={() => dispatch({ type: "add_contact" })}>Add new Contact</button>
			<ul className="list-group">
				{store.contacts.map(
					(element) => {
						return (
							<Contact
								name={element.name}
								address={element.address}
								phone={element.phone}
								email={element.email}
								key={element.id}
							/>
						)
					}
				)}
			</ul>
		</>
	);
};
