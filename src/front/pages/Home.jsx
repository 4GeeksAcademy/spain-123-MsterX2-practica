import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactList } from "./ContactList/ContactList.jsx";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	return (
		<header className="text-center py-5">
			<div className="container">
				<h1 className="display-3 star-wars-title">
					<i className="fas fa-star me-3"></i>
					STAR WARS DATABASE
					<i className="fas fa-star ms-3"></i>
				</h1>
				<p className="lead mt-3">
					<i className="fas fa-space-shuttle me-2"></i>
					Explora la galaxia muy, muy lejana
				</p>
			</div>
		</header>
	);
}; 