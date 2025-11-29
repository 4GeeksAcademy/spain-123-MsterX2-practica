import { useContext } from "react";
import { singleContactContext } from "./ContactListLayout";

const SingleContact = () => {
    const { singleContact } = useContext(singleContactContext);
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center bg-primary text-white">
                    {singleContact.image ? (
                        <img
                            src={singleContact.image}
                            alt={singleContact.name}
                            className="img-fluid rounded-circle"
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                    ) : (
                        <i className="fas fa-user fa-3x"></i>
                    )}
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{singleContact.name}</h5>
                        <p className="card-text mb-1">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {singleContact.address}
                        </p>
                        <p className="card-text mb-1">
                            <i className="fas fa-phone me-2"></i>
                            {singleContact.phone}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-envelope me-2"></i>
                            {singleContact.email}
                        </p>
                        <small className="text-muted">ID: {singleContact.id}</small>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SingleContact;
