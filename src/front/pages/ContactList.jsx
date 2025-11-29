
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Contact } from "../components/Contact";
import { useContext, useEffect, useState } from "react";
import apiRequest from "../apiRequest";
import { ContactForm } from "../components/ContactForm";
import { object } from "prop-types";
import { crudContext } from "./ContactListLayout";


export const host = "https://playground.4geeks.com/contact";
export const getContacts = async (dispatch) => {
	try {
		const data = await apiRequest(
			host,
			"/agendas/chanchitoFeliz",
			"GET"
		)
		if (data?.status === 404) {
			throw new Error(404);
		}
		dispatch({ type: "update_contact", payload: data.contacts })
	} catch (error) {
		console.log(`${error}`)
		await apiRequest(
			host,
			"/agendas/chanchitoFeliz",
			"POST",
			{ slug: "chanchitoFeliz" }
		)
	}
};

export const ContactList = () => {
	// global store
	const { store, dispatch } = useGlobalReducer();
	const { editValue, setEditValue } = useContext(crudContext);
	// estados
	const [action, setAction] = useState(null);

	//  update contacts from, api create user if missing
	useEffect(
		() => {
			getContacts(dispatch);
		},
		[]
	);

	// use dispatch
	useEffect(
		() => {
			if (!action) return;
			dispatch(action)
		},
		[action]
	)

	// select element to edit
	useEffect(
		() => {
			if (!editValue || typeof editValue?.selectedElement === "object") return;
			for (const item of store.contacts) {
				if (item.id == editValue.selectedElement) {
					setEditValue({ ...editValue, selectedElement: item, uri: `/agendas/chanchitoFeliz/contacts/${item.id}` });
					break;
				}
			}

		},
		[editValue]
	)



	return (
		<>
			<button
				onClick={() => {
					setEditValue({ method: "POST", uri: "/agendas/chanchitoFeliz/contacts" });
				}}
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
			>Add new Contact</button>
			<ContactForm />
			<ul className="list-group">
				{store.contacts.map(
					(element) => {
						return (
							<Contact
								id={element.id}
								name={element.name}
								address={element.address}
								phone={element.phone}
								email={element.email}
								key={element.id}
								setEditValue={setEditValue}
							/>
						)
					}
				)}
			</ul>
		</>
	);
};
