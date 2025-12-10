import React, { useContext } from 'react';
import { StarWarsCard } from '../../components/StarWarsCard';
import { searchContext } from '../Layout';

export const Vehicles = () => {
    const [searchTerm, setSearchTerm] = useContext(searchContext);


    const vehiclesData = [
        {
            id: 1,
            title: 'X-Wing Starfighter',
            image: 'https://images.unsplash.com/photo-1656716459789-9875ab1177f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMHNwYWNlfGVufDF8fHx8MTc2NDc3ODU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Clase: Caza estelar',
                'Fabricante: Incom Corporation',
                'Armamento: 4 cañones láser',
                'Tripulación: 1 piloto + 1 droide'
            ]
        },
        {
            id: 2,
            title: 'Millennium Falcon',
            image: 'https://images.unsplash.com/photo-1656716459789-9875ab1177f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMHNwYWNlfGVufDF8fHx8MTc2NDc3ODU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Clase: Carguero ligero YT-1300',
                'Velocidad: 0.5 hiperespacial',
                'Propietario: Han Solo',
                'Características: Modificado ilegalmente'
            ]
        },
        {
            id: 3,
            title: 'TIE Fighter',
            image: 'https://images.unsplash.com/photo-1656716459789-9875ab1177f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMHNwYWNlfGVufDF8fHx8MTc2NDc3ODU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Clase: Caza estelar',
                'Afiliación: Imperio Galáctico',
                'Armamento: 2 cañones láser',
                'Característica: Alta maniobrabilidad'
            ]
        },
        {
            id: 4,
            title: 'Star Destroyer',
            image: 'https://images.unsplash.com/photo-1656716459789-9875ab1177f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMHNwYWNlfGVufDF8fHx8MTc2NDc3ODU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Clase: Destructor Estelar Clase Imperial',
                'Longitud: 1,600 metros',
                'Tripulación: 37,000 personas',
                'Armamento: 60 turbolásers'
            ]
        },
        {
            id: 5,
            title: 'AT-AT Walker',
            image: 'https://images.unsplash.com/photo-1656716459789-9875ab1177f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMHNwYWNlfGVufDF8fHx8MTc2NDc3ODU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Clase: Transporte blindado todo terreno',
                'Altura: 22.5 metros',
                'Tripulación: 5 operadores',
                'Capacidad: 40 soldados'
            ]
        },
        {
            id: 6,
            title: 'Speeder Bike',
            image: 'https://images.unsplash.com/photo-1656716459789-9875ab1177f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMHNwYWNlfGVufDF8fHx8MTc2NDc3ODU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Clase: Moto de reconocimiento',
                'Velocidad máxima: 500 km/h',
                'Tripulación: 1 piloto',
                'Uso principal: Patrulla y exploración'
            ]
        }
    ];

    const handleVehicleClick = (id, title) => {
        console.log(`Vehicle clicked: ${title} (ID: ${id})`);
    };

    const filteredVehicles = vehiclesData.filter(vehicle =>
        vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                            image={vehicle.image}
                            title={vehicle.title}
                            items={vehicle.items}
                            onClick={() => handleVehicleClick(vehicle.id, vehicle.title, vehicle.items)}
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
