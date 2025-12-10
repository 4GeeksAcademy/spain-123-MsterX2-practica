import React, { useContext } from 'react';
import { StarWarsCard } from '../../components/StarWarsCard';
import { searchContext } from '../Layout';

export const Planets = () => {
    const [searchTerm, setSearchTerm] = useContext(searchContext);

    const planetsData = [
        {
            id: 1,
            title: 'Tatooine',
            image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzdGFyc3xlbnwxfHx8fDE3NjQ3NDU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Tipo: Planeta desértico',
                'Región: Borde Exterior',
                'Soles: 2 (binario)',
                'Población: 200,000 habitantes'
            ]
        },
        {
            id: 2,
            title: 'Coruscant',
            image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzdGFyc3xlbnwxfHx8fDE3NjQ3NDU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Tipo: Ecumenópolis (ciudad planeta)',
                'Región: Mundos del Núcleo',
                'Capital: República/Imperio Galáctico',
                'Población: 1 billón de habitantes'
            ]
        },
        {
            id: 3,
            title: 'Hoth',
            image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzdGFyc3xlbnwxfHx8fDE3NjQ3NDU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Tipo: Planeta helado',
                'Región: Borde Exterior',
                'Clima: Temperaturas bajo cero',
                'Base: Echo Base (Alianza Rebelde)'
            ]
        },
        {
            id: 4,
            title: 'Endor',
            image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzdGFyc3xlbnwxfHx8fDE3NjQ3NDU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Tipo: Luna boscosa',
                'Región: Territorios del Borde Exterior',
                'Habitantes nativos: Ewoks',
                'Terreno: Bosques densos'
            ]
        },
        {
            id: 5,
            title: 'Naboo',
            image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzdGFyc3xlbnwxfHx8fDE3NjQ3NDU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Tipo: Planeta templado',
                'Región: Borde Medio',
                'Habitantes: Humanos y Gungans',
                'Característica: Planeta natal de Padmé'
            ]
        },
        {
            id: 6,
            title: 'Dagobah',
            image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBzdGFyc3xlbnwxfHx8fDE3NjQ3NDU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Tipo: Planeta pantanoso',
                'Región: Borde Exterior',
                'Clima: Húmedo y neblinoso',
                'Habitante notable: Maestro Yoda'
            ]
        }
    ];

    const handlePlanetClick = (id, title) => {
        console.log(`Planet clicked: ${title} (ID: ${id})`);
    };

    const filteredPlanets = planetsData.filter(planet =>
        planet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        planet.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="section-title">
                    <i className="fas fa-globe me-3"></i>
                    PLANETS & SYSTEMS
                </h2>
                <p className="section-subtitle">
                    <i className="fas fa-satellite me-2"></i>
                    Worlds Across the Galaxy
                </p>
            </div>
            <div className="row">
                {filteredPlanets.length > 0 ? (
                    filteredPlanets.map((planet) => (
                        <StarWarsCard
                            key={planet.id}
                            image={planet.image}
                            title={planet.title}
                            items={planet.items}
                            onClick={() => handlePlanetClick(planet.id, planet.title)}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <div className="no-results">
                            <i className="fas fa-search fa-3x mb-3"></i>
                            <h3>No planets found</h3>
                            <p>Try adjusting your search term</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
