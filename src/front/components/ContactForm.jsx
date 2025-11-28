import { useContext, useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";
import apiRequest from "../apiRequest";
import { crudContext, getContacts, host } from "../pages/ContactList";
import { object } from "prop-types";





export const ContactForm = (props) => {
    const { dispatch } = useGlobalReducer();
    const [contactForm, setContactForm] = useState(
        {
            "name": "",
            "phone": "",
            "email": "",
            "address": "",
        }
    )
    const [isSubmit, setIsSubmit] = useState(false)
    const { editValue, setEditValue } = useContext(crudContext);


    const CreateOrUpdateContact = async () => {
        await apiRequest(
            host,
            editValue?.uri,
            editValue?.method,
            contactForm
        )

        setContactForm({
            "name": "",
            "phone": "",
            "email": "",
            "address": "",
        });
        setEditValue(null);
        setIsSubmit(false);
        getContacts(dispatch);
    }


    const handleInput = e => {
        const field = e.target.dataset.type;
        setContactForm(prev => {
            return { ...prev, [field]: e.target.value }
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmit(true)
    };

    useEffect(
        () => {
            if (!isSubmit) return;
            if (!contactForm.name || !contactForm.address || !contactForm.email || !contactForm.phone) {
                alert("porfavor rellene todos los campos para continuar");
                setIsSubmit(false);
                return
            }
            console.log(editValue.method, editValue.uri, "mostrando si pasa este condicional respuesta: ", !editValue?.method || !editValue?.uri)
            if (!editValue?.method || !editValue?.uri) return;
            if (editValue.method) {
                CreateOrUpdateContact();
                return;
            }
        },
        [isSubmit]
    )

    // clear or upload form data every time form is opened
    useEffect(
        () => {
            if (!editValue) return;
            if (editValue?.method === "POST") setContactForm({
                "name": "",
                "phone": "",
                "email": "",
                "address": "",
            });
            if (!editValue || typeof editValue?.selectedElement !== "object" ||
                !("name" in editValue?.selectedElement) ||
                !("phone" in editValue?.selectedElement) ||
                !("email" in editValue?.selectedElement) ||
                !("address" in editValue?.selectedElement)) return;
            setContactForm({ ...contactForm, ...editValue.selectedElement });
        },
        [editValue]
    )

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="contactName" className="form-label">Name</label>
                            <input onChange={handleInput} value={contactForm.name} data-type="name" type="text" className="form-control" id="contactName" placeholder="Chanchito Feliz" />

                            <label htmlFor="contactPhone" className="form-label">Phone</label>
                            <input onChange={handleInput} value={contactForm.phone} data-type="phone" type="tel" className="form-control" id="contactPhone" placeholder="+12445678912" />

                            <label htmlFor="contactEmail" className="form-label">Email</label>
                            <input onChange={handleInput} value={contactForm.email} data-type="email" type="email" className="form-control" id="contactEmail" placeholder="chanchitoFeliz@example.com" />

                            <label htmlFor="contactAdress" className="form-label">Address</label>
                            <input onChange={handleInput} value={contactForm.address} data-type="address" type="text" className="form-control" id="contactAdress" placeholder="calle de los chanchitos portal 35" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}