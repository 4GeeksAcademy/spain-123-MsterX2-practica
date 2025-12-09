import { createContext, useContext, useState } from "react";

export const crudContext = createContext(undefined);
export const singleContactContext = createContext(undefined);

export const ContactContextProvider = ({ children }) => {
    const [editValue, setEditValue] = useState(null);
    const [singleContact, setSingleContact] = useState({
        id: 0,
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'Luke Skywalker',
            address: 'Tatooine, Mos Eisley Cantina',
            phone: '+1-555-FORCE-01',
            email: 'luke@rebellion.com'
        },
        {
            id: 2,
            name: 'Leia Organa',
            address: 'Alderaan, Royal Palace',
            phone: '+1-555-REBEL-02',
            email: 'princess@rebellion.com'
        },
        {
            id: 3,
            name: 'Han Solo',
            address: 'Millennium Falcon, Docking Bay 94',
            phone: '+1-555-SMUGGL',
            email: 'han@smuggler.com'
        }
    ]);

    const [animatingId, setAnimatingId] = useState(null);
    const [animationType, setAnimationType] = useState(null);

    return (
        <crudContext.Provider
            value={{
                editValue,
                setEditValue,
                contacts,
                setContacts,
                animatingId,
                setAnimatingId,
                animationType,
                setAnimationType
            }}
        >
            <singleContactContext.Provider value={{ singleContact, setSingleContact }}>
                {children}
            </singleContactContext.Provider>
        </crudContext.Provider>
    );
};


export const useCrudContext = () => {
    const {
        editValue,
        setEditValue,
        contacts,
        setContacts,
        animatingId,
        setAnimatingId,
        animationType,
        setAnimationType
    } = useContext(crudContext)
    return {
        editValue, setEditValue, contacts, setContacts, animatingId,
        setAnimatingId, animationType, setAnimationType
    }
}

export const useSingleContact = () => {
    const { singleContact, setSingleContact } = useContext(singleContactContext)
    return { singleContact, setSingleContact }
}