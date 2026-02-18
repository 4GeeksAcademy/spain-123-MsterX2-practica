import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Dashboard = () => {
    const { store } = useGlobalReducer();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="star-wars-card">
                        <div className="p-4 p-md-5">
                            <div className="text-center mb-4">
                                <i className="fas fa-jedi fa-3x mb-3" style={{ color: 'var(--sw-yellow)', textShadow: '0 0 20px var(--sw-yellow)' }}></i>
                                <h1 className="star-wars-title display-4">
                                    Dashboard del Usuario
                                </h1>
                            </div>

                            <div className="text-center">
                                <p className="section-subtitle lead mb-4">
                                    Bienvenido a tu centro de control galáctico personal
                                </p>
                                <p style={{ color: 'var(--sw-cyan)', fontFamily: 'var(--font-roboto)' }}>
                                    Desde aquí podrás gestionar tu experiencia en la base de datos de Star Wars,
                                    acceder a tus favoritos, administrar tus contactos y explorar el universo.
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-top" style={{ borderColor: 'rgba(0, 212, 255, 0.3)' }}>
                                <div className="text-center">
                                    <p className="mb-0" style={{ color: 'var(--sw-yellow)', fontFamily: 'var(--font-orbitron)', fontSize: '0.9rem' }}>
                                        <i className="fas fa-quote-left me-2"></i>
                                        Que la Fuerza te acompañe
                                        <i className="fas fa-quote-right ms-2"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
