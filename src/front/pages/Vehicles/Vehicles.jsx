import React, { useContext, useEffect, useState } from 'react';
import { StarWarsCard } from '../../components/StarWarsCard';
import { searchContext } from '../Layout';
import { apiRequest } from '../../apiRequest';
import { useNavigate } from 'react-router-dom';

export const Vehicles = () => {
    const [searchTerm, setSearchTerm] = useContext(searchContext);
    const [vehiclesData, setVehiclesData] = useState([])
    const [filteredVehicles, setFilteredVehicles] = useState([])
    const navigate = useNavigate()

    const host = "https://www.swapi.tech/api";
    const getData = async () => {
        const data = await apiRequest(host, "/vehicles", "GET");
        console.log(data.results)
        setVehiclesData(data.results)
    }
    useEffect(
        () => {
            getData()
        }, [])

    useEffect(
        () => {
            console.log(vehiclesData)
            if (vehiclesData.length == 0) return;
            const filtrados = vehiclesData.filter(vehicle =>
                vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredVehicles(filtrados)
        }, [vehiclesData,]
    )



    // const vehiclesData = ;

    const handleVehicleClick = async (id) => {
        console.log(`Vehicle clicked: (ID: ${id})`);
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="section-title">
                    <i className="fas fa-rocket me-3"></i>
                    VEHICLES & STARSHIPS
                </h2>
                <p className="section-subtitle">
                    <i className="fas fa-space-shuttle me-2"></i>
                    Legendary Ships of the Galaxy
                </p>
            </div>
            <div className="row">
                {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                        <StarWarsCard
                            key={vehicle.id}
                            title={vehicle.title}
                            items={[vehicle.name]}
                            onClick={() => handleVehicleClick(vehicle.id)}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <div className="no-results">
                            <i className="fas fa-search fa-3x mb-3"></i>
                            <h3>No vehicles found</h3>
                            <p>Try adjusting your search term</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
