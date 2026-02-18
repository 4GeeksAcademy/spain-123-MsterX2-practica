import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from 'react';
import { searchContext } from "../pages/Layout";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = ({ activeSection, onSectionChange }) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useContext(searchContext);
	const { store, dispatch } = useGlobalReducer();
	const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
	const accountDropdownRef = useRef(null);

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		dispatch({ type: "HANDLE_TOKEN", payload: "" })
		dispatch({ type: "LOGOUT" });
		navigate("/");
	};

	const handleClick = (e, section) => {
		if (onSectionChange && typeof onSectionChange === 'function') {
			e.preventDefault();
			onSectionChange(section);
		}
	};

	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
				setIsAccountDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Cerrar dropdown al cambiar de ruta
	useEffect(() => {
		setIsAccountDropdownOpen(false);
	}, [activeSection]);

	// Items de navegación
	const publicNavItems = [
		{ to: "/people", icon: "fa-users", label: "People", section: "people" },
		{ to: "/vehicles", icon: "fa-rocket", label: "Vehicles", section: "vehicles" },
		{ to: "/planets", icon: "fa-globe", label: "Planets", section: "planets" },
	];

	const accountNavItems = [
		{ to: "/favorites", icon: "fa-heart", label: "Favorites", section: "favorites" },
		{ to: "/contacts", icon: "fa-address-book", label: "Contacts", section: "contacts" },
		{ to: "/dashboard", icon: "fa-tachometer-alt", label: "Dashboard", section: "dashboard" },
	];

	// Verificar si algún item de account está activo
	const isAccountActive = accountNavItems.some(item => activeSection === item.section);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark star-wars-navbar sticky-top">
			<div className="container">
				<Link
					className="navbar-brand border-0 bg-transparent"
					to={"/"}
					style={{ cursor: 'pointer' }}
				>
					<i className="fas fa-star-of-life me-2"></i>
					STAR WARS
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
						{/* Items públicos - siempre visibles */}
						{publicNavItems.map((item) => (
							<li className="nav-item" key={item.section}>
								<NavLink
									to={item.to}
									className={`nav-link border-0 bg-transparent ${activeSection === item.section ? 'active' : ''}`}
									style={{ cursor: 'pointer' }}
								>
									<i className={`fas ${item.icon} me-2`}></i>
									{item.label}
								</NavLink>
							</li>
						))}

						{/* Dropdown "My Account" para usuarios autenticados */}
						{store.isAuthenticated && (
							<li className="nav-item dropdown" ref={accountDropdownRef}>
								<button
									className={`nav-link dropdown-toggle border-0 bg-transparent ${isAccountActive ? 'active' : ''}`}
									onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
									aria-expanded={isAccountDropdownOpen}
									style={{ cursor: 'pointer' }}
								>
									<i className="fas fa-user-circle me-2"></i>
									My Account
								</button>
								<ul className={`dropdown-menu star-wars-dropdown ${isAccountDropdownOpen ? 'show' : ''}`}>
									{accountNavItems.map((item) => (
										<li key={item.section}>
											<NavLink
												to={item.to}
												className={`dropdown-item ${activeSection === item.section ? 'active' : ''}`}
												style={{ cursor: 'pointer' }}
												onClick={(e) => handleClick(e, item.section)}
											>
												<i className={`fas ${item.icon} me-2`}></i>
												{item.label}
											</NavLink>
										</li>
									))}
								</ul>
							</li>
						)}
					</ul>

					<div className="d-flex align-items-center gap-2">
						<div className="search-container">
							<i className="fas fa-search search-icon"></i>
							<input
								type="text"
								className="form-control star-wars-search"
								placeholder="Search..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{store.isAuthenticated ? (
							<div className="auth-buttons-container d-flex align-items-center gap-2">
								<span className="navbar-user-name d-none d-md-inline">
									<i className="fas fa-jedi me-1"></i>
									{store.user?.first_name || store.user?.email || 'User'}
								</span>
								<button
									className="btn star-wars-button-secondary navbar-auth-btn"
									onClick={handleLogout}
									title="Logout"
								>
									<i className="fas fa-sign-out-alt"></i>
									<span className="d-none d-lg-inline ms-1">Logout</span>
								</button>
							</div>
						) : (
							<div className="auth-buttons-container d-flex align-items-center gap-2">
								<Link
									to="/login"
									className="btn star-wars-button-secondary navbar-auth-btn"
									title="Login"
								>
									<i className="fas fa-user"></i>
									<span className="d-none d-lg-inline ms-1">Login</span>
								</Link>
								<Link
									to="/login"
									className="btn star-wars-button navbar-auth-btn"
									title="Sign Up"
								>
									<i className="fas fa-user-plus"></i>
									<span className="d-none d-lg-inline ms-1">Sign Up</span>
								</Link>
							</div>
						)}
					</div>

				</div>
			</div>
		</nav>
	);
};
