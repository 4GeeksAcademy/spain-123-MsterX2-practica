import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactList } from "./ContactList/ContactList.jsx";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	return (
		<h1>este es el Home</h1>
	);
}; 