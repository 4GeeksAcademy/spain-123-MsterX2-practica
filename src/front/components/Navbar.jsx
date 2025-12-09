import { Link } from "react-router-dom";
import React from 'react';

export const Navbar = ({ activeSection, onSectionChange, searchTerm, onSearchChange }) => {
	const handleClick = (e, section) => {
		e.preventDefault();
		onSectionChange(section);
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark star-wars-navbar sticky-top">
			<div className="container">
				<button
					className="navbar-brand border-0 bg-transparent"
					onClick={(e) => e.preventDefault()}
					style={{ cursor: 'pointer' }}
				>
					<i className="fas fa-star-of-life me-2"></i>
					STAR WARS DATABASE
				</button>

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

						<li className="nav-item">
							<button
								className={`nav-link border-0 bg-transparent ${activeSection === 'people' ? 'active' : ''}`}
								onClick={(e) => handleClick(e, 'people')}
								style={{ cursor: 'pointer' }}
							>
								<i className="fas fa-users me-2"></i>
								People
							</button>
						</li>

						<li className="nav-item">
							<button
								className={`nav-link border-0 bg-transparent ${activeSection === 'vehicles' ? 'active' : ''}`}
								onClick={(e) => handleClick(e, 'vehicles')}
								style={{ cursor: 'pointer' }}
							>
								<i className="fas fa-rocket me-2"></i>
								Vehicles
							</button>
						</li>

						<li className="nav-item">
							<button
								className={`nav-link border-0 bg-transparent ${activeSection === 'planets' ? 'active' : ''}`}
								onClick={(e) => handleClick(e, 'planets')}
								style={{ cursor: 'pointer' }}
							>
								<i className="fas fa-globe me-2"></i>
								Planets
							</button>
						</li>

						<li className="nav-item">
							<button
								className={`nav-link border-0 bg-transparent ${activeSection === 'contacts' ? 'active' : ''}`}
								onClick={(e) => handleClick(e, 'contacts')}
								style={{ cursor: 'pointer' }}
							>
								<i className="fas fa-address-book me-2"></i>
								Contact List
							</button>
						</li>

					</ul>

					<div className="d-flex">
						<div className="search-container">
							<i className="fas fa-search search-icon"></i>
							<input
								type="text"
								className="form-control star-wars-search"
								placeholder="Search in galaxy..."
								value={searchTerm}
								onChange={(e) => onSearchChange(e.target.value)}
							/>
						</div>
					</div>

				</div>
			</div>
		</nav>
	);
};
