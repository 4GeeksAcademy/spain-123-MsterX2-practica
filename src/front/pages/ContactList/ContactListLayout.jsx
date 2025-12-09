import { ContactContextProvider } from "../../hooks/useContactsContex"


export const ContactListLayout = () => {
    return (
        <ContactContextProvider>
            <ContactList searchTerm={searchTerm} />
        </ContactContextProvider>
    )
}
