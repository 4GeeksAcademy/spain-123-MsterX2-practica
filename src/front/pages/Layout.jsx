import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect, useState } from "react"
import { ContactList } from './ContactList/ContactList'
import { People } from "./People/People"
import { Vehicles } from "./Vehicles/Vehicles"
import { Planets } from "./Planets/Planets"
import { ContactContextProvider } from "../hooks/useContactsContex"
import imgStructure from "../img"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const [activeSection, setActiveSection] = useState('people');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(
        () => {
            console.log(imgStructure)
        }, []
    )
    const renderSection = () => {
        switch (activeSection) {
            case 'people':
                return <People searchTerm={searchTerm} />;
            case 'vehicles':
                return <Vehicles searchTerm={searchTerm} />;
            case 'planets':
                return <Planets searchTerm={searchTerm} />;
            case 'contacts':
                return (
                    <ContactContextProvider>
                        <ContactList searchTerm={searchTerm} />
                    </ContactContextProvider>
                );
            default:
                return <People searchTerm={searchTerm} />;
        }
    };
    return (
        <ScrollToTop>

            <Navbar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            {/* <header className="text-center py-5">
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
            </header> */}
            <main>
                {/* <Outlet /> */}
                {renderSection()}
            </main>
            <Footer />
        </ScrollToTop>
    )
}