import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from 'react';
import { searchContext } from "../pages/Layout";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = ({ activeSection, onSectionChange }) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useContext(searchContext);
	const { store, dispatch } = useGlobalReducer();
	const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
	const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
	const [visibleItems, setVisibleItems] = useState([]);
	const [hiddenItems, setHiddenItems] = useState([]);
	const accountDropdownRef = useRef(null);
	const moreDropdownRef = useRef(null);
	const navLinksRef = useRef(null);
	const moreButtonRef = useRef(null);

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

	const allNavItems = [
		...publicNavItems,
		...(store.isAuthenticated ? [{
			type: 'dropdown',
			label: 'My Account',
			icon: 'fa-user-circle',
			section: 'account',
			items: accountNavItems
		}] : [])
	];

	const isAccountActive = accountNavItems.some(item => activeSection === item.section);

	useEffect(() => {
		const calculateVisibleItems = () => {
			if (window.innerWidth < 992) {
				setVisibleItems(allNavItems);
				setHiddenItems([]);
				return;
			}

			const navContainer = navLinksRef.current;
			const moreButton = moreButtonRef.current;
			if (!navContainer) return;

			const containerWidth = navContainer.offsetWidth;
			const reservedWidth = 300;
			const availableWidth = containerWidth - reservedWidth;
			const moreButtonWidth = moreButton ? moreButton.offsetWidth : 100;

			let currentWidth = 0;
			const visible = [];
			const hidden = [];
			const itemWidth = 100;

			for (let i = 0; i < allNavItems.length; i++) {
				const itemWidthWithGap = itemWidth + 8;
				const neededWidth = i < allNavItems.length - 1
					? itemWidthWithGap
					: itemWidth;

				if (currentWidth + neededWidth + moreButtonWidth <= availableWidth || i === 0) {
					visible.push(allNavItems[i]);
					currentWidth += neededWidth;
				} else {
					hidden.push(allNavItems[i]);
				}
			}

			setVisibleItems(visible);
			setHiddenItems(hidden);
		};

		calculateVisibleItems();
		window.addEventListener('resize', calculateVisibleItems);
		return () => window.removeEventListener('resize', calculateVisibleItems);
	}, [allNavItems.length, store.isAuthenticated]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
				setIsAccountDropdownOpen(false);
			}
			if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
				setIsMoreDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		setIsAccountDropdownOpen(false);
		setIsMoreDropdownOpen(false);
	}, [activeSection]);

	const renderNavItem = (item, isInMoreDropdown = false) => {
		if (item.type === 'dropdown') {
			return (
				<li className={`navbar-link-item dropdown ${isInMoreDropdown ? 'more-dropdown-item' : ''}`} ref={isInMoreDropdown ? null : accountDropdownRef}>
					<button
						className={`navbar-link dropdown-toggle ${isAccountActive ? 'active' : ''}`}
						onClick={() => isInMoreDropdown ? null : setIsAccountDropdownOpen(!isAccountDropdownOpen)}
						aria-expanded={isAccountDropdownOpen}
					>
						<i className={`fas ${item.icon} me-2`}></i>
						{item.label}
					</button>
					<ul className={`dropdown-menu star-wars-dropdown ${isAccountDropdownOpen && !isInMoreDropdown ? 'show' : ''}`}>
						{item.items.map((subItem) => (
							<li key={subItem.section}>
								<NavLink
									to={subItem.to}
									className={`dropdown-item ${activeSection === subItem.section ? 'active' : ''}`}
									onClick={(e) => handleClick(e, subItem.section)}
								>
									<i className={`fas ${subItem.icon} me-2`}></i>
									{subItem.label}
								</NavLink>
							</li>
						))}
					</ul>
				</li>
			);
		}

		return (
			<li className={`navbar-link-item ${isInMoreDropdown ? 'more-dropdown-item' : ''}`} key={item.section}>
				<NavLink
					to={item.to}
					className={`navbar-link ${activeSection === item.section ? 'active' : ''}`}
					onClick={() => isInMoreDropdown && setIsMoreDropdownOpen(false)}
				>
					<i className={`fas ${item.icon} me-2`}></i>
					{item.label}
				</NavLink>
			</li>
		);
	};

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

				<div className="navbar-content" id="navbarNav">
					<ul className="navbar-links" ref={navLinksRef}>
						{visibleItems.map(item => renderNavItem(item))}

						{hiddenItems.length > 0 && (
							<li className="navbar-link-item dropdown" ref={moreDropdownRef}>
								<button
									ref={moreButtonRef}
									className="navbar-link dropdown-toggle"
									onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
									aria-expanded={isMoreDropdownOpen}
								>
									<i className="fas fa-ellipsis-h me-2"></i>
									More
								</button>
								<ul className={`dropdown-menu star-wars-dropdown ${isMoreDropdownOpen ? 'show' : ''}`}>
									{hiddenItems.map(item => (
										<li key={item.section || item.label}>
											{item.type === 'dropdown' ? (
												<>
													<span className="dropdown-header">
														<i className={`fas ${item.icon} me-2`}></i>
														{item.label}
													</span>
													{item.items.map(subItem => (
														<NavLink
															key={subItem.section}
															to={subItem.to}
															className={`dropdown-item ${activeSection === subItem.section ? 'active' : ''}`}
															onClick={(e) => {
																handleClick(e, subItem.section);
																setIsMoreDropdownOpen(false);
															}}
														>
															<i className={`fas ${subItem.icon} me-2`}></i>
															{subItem.label}
														</NavLink>
													))}
												</>
											) : (
												<NavLink
													to={item.to}
													className={`dropdown-item ${activeSection === item.section ? 'active' : ''}`}
													onClick={() => setIsMoreDropdownOpen(false)}
												>
													<i className={`fas ${item.icon} me-2`}></i>
													{item.label}
												</NavLink>
											)}
										</li>
									))}
								</ul>
							</li>
						)}
					</ul>

					<div className="navbar-auth-section">
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
							<div className="auth-buttons-container">
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
							<div className="auth-buttons-container">
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
