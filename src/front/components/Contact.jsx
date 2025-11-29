import { useContext } from "react"
import { getContacts, host } from "../pages/ContactList"
import apiRequest from "../apiRequest"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { crudContext, singleContactContext } from "../pages/ContactListLayout";

export const Contact = (props) => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate()
    const { setSingleContact } = useContext(singleContactContext)
    const { setEditValue } = useContext(crudContext)
    const handleEdit = (e) => {
        e.stopPropagation();
        setEditValue(
            { selectedElement: e.currentTarget.dataset.id, method: e.currentTarget.dataset.actionType }
        )
    }

    const handleDelete = async (e) => {
        e.stopPropagation();

        await apiRequest(
            host,
            `/agendas/chanchitoFeliz/contacts/${e.currentTarget.dataset.id}`,
            "delete"
        )
        setEditValue(null)
        getContacts(dispatch)
    }

    const handleSingleView = (e) => {
        let element;
        for (const item of store.contacts) {
            if (item.id == e.currentTarget.dataset.id) {
                element = item;
                break;
            }
        }
        setSingleContact({ ...element, image: `https://loremflickr.com/80/80/cat?lock=${element.id}` })
        navigate(`/contactos/:${element.id}`)
    }


    return (
        <li className="list-group-item" data-id={props.id} onClick={handleSingleView}>
            <div className="userData">
                <img className="userImage" src={`https://loremflickr.com/80/80/cat?lock=${props.id}`} alt="userImage" />
                <div className="userDetails">
                    <span><b>{props.name}</b></span>
                    <span className="userInfo"><i className="fas fa-map-marker-alt"></i><span>{props.address}</span></span>
                    <span className="userInfo"><i className="fas fa-phone"></i><span>{props.phone}</span></span>
                    <span className="userInfo"><i className="fas fa-envelope"></i><span>{props.email}</span></span>
                </div>
            </div>
            <div className="actionButtons">
                <span onClick={handleEdit} data-id={props.id} className="btn btn-primary" data-action-type="PUT" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
                <span onClick={handleDelete} data-id={props.id} className="btn btn-danger" data-action-type="DELETE">
                    <i className="fa-solid fa-trash"></i>
                </span>
            </div>
        </li>
    )
}