import { createContext, useState } from "react"
import { Outlet } from "react-router-dom/dist"


export const crudContext = createContext()
export const singleContactContext = createContext()

export const ContactListLayout = () => {
    const [editValue, setEditValue] = useState(null);
    const [singleContact, setSingleContact] = useState(
        {
            id: "",
            name: "",
            address: "",
            phone: "",
            email: ""
        }
    )

    return (
        < crudContext.Provider value={{ editValue, setEditValue }}>
            < singleContactContext.Provider value={{ singleContact, setSingleContact }}>
                <Outlet />
            </singleContactContext.Provider >
        </crudContext.Provider >
    )
}
