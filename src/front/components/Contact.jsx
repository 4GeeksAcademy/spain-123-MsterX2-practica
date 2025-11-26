import useGlobalReducer from "../hooks/useGlobalReducer"

export const Contact = (props) => {
    const { store, dispatch } = useGlobalReducer()

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
                <span onClick={() => (dispatch({ type: "edit_contact" }))} className="btn btn-primary">
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
                <span onClick={() => (dispatch({ type: "delete_contact" }))} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </span>
            </div>
        </li>
    )
}