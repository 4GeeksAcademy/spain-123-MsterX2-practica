import { useContext } from "react"
import { crudContext, getContacts, host } from "../pages/ContactList"
import apiRequest from "../apiRequest"
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Contact = (props) => {
    const { dispatch } = useGlobalReducer();

    const { setEditValue } = useContext(crudContext)
    const handleEdit = (e) => {
        setEditValue(
            { selectedElement: e.currentTarget.dataset.id, method: e.currentTarget.dataset.actionType }
        )
    }

    const handleDelete = async (e) => {
        await apiRequest(
            host,
            `/agendas/chanchitoFeliz/contacts/${e.currentTarget.dataset.id}`,
            "delete"
        )
        setEditValue(null)
        getContacts(dispatch)
    }


    return (
        <li className="list-group-item">
            <div className="userData">
                <img className="userImage" src="../../../4geeks.ico" alt="userImage" />
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