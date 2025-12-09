import React from 'react';

export const StarWarsCard = ({ image, title, items, onClick }) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 star-wars-card" onClick={onClick} style={{ cursor: 'pointer' }}>
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">
                        <i className="fas fa-jedi me-2"></i>
                        {title}
                    </h5>
                    <ul className="list-group list-group-flush">
                        {items.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <i className="fas fa-chevron-right me-2"></i>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
