import React from 'react';

export const DetailView = ({ image, title, items, onBack }) => {
    return (
        <div className="container py-5">
            <div className="detail-view-container">
                <button onClick={onBack} className="btn btn-secondary mb-4 star-wars-back-button">
                    Back to List
                </button>

                <div className="detail-card">
                    <div className="row g-0">
                        <div className="col-md-5">
                            <img src={image} alt={title} className="detail-image" />
                        </div>

                        <div className="col-md-7">
                            <div className="detail-content">
                                <h2 className="detail-title">{title}</h2>

                                <div className="detail-info-grid">
                                    {items.map((item, index) => (
                                        <div key={index} className="detail-info-item">
                                            <span className="detail-label">{item.label}:</span>
                                            <span className="detail-value">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
