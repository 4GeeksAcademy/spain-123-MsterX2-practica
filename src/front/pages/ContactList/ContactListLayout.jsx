import { ContactContextProvider } from "../../hooks/useContactsContex"
import { ContactList } from "./ContactList"


export const ContactListLayout = () => {
    return (
        <ContactContextProvider>
            <ContactList />
        </ContactContextProvider>
    )
}
