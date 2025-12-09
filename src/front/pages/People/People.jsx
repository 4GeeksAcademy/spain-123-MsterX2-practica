import React from 'react';
import { StarWarsCard } from '../../components/StarWarsCard';

export const People = ({ searchTerm }) => {
    const peopleData = [
        {
            id: 1,
            title: 'Luke Skywalker',
            image: 'https://images.unsplash.com/photo-1546938576-7d56dda5e7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NjQ3Nzg1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Especie: Humano',
                'Afiliación: Alianza Rebelde',
                'Planeta natal: Tatooine',
                'Habilidad: Uso de la Fuerza'
            ]
        },
        {
            id: 2,
            title: 'Leia Organa',
            image: 'https://images.unsplash.com/photo-1546938576-7d56dda5e7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NjQ3Nzg1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Especie: Humana',
                'Rango: Princesa de Alderaan',
                'Afiliación: Senado Galáctico',
                'Rol: Líder de la Rebelión'
            ]
        },
        {
            id: 3,
            title: 'Han Solo',
            image: 'https://images.unsplash.com/photo-1546938576-7d56dda5e7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NjQ3Nzg1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Especie: Humano',
                'Profesión: Contrabandista',
                'Nave: Halcón Milenario',
                'Copiloto: Chewbacca'
            ]
        },
        {
            id: 4,
            title: 'Darth Vader',
            image: 'https://images.unsplash.com/photo-1546938576-7d56dda5e7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NjQ3Nzg1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Especie: Humano (cyborg)',
                'Afiliación: Imperio Galáctico',
                'Rango: Lord Sith',
                'Sable de luz: Rojo'
            ]
        },
        {
            id: 5,
            title: 'Yoda',
            image: 'https://images.unsplash.com/photo-1546938576-7d56dda5e7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NjQ3Nzg1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Especie: Desconocida',
                'Edad: 900 años',
                'Rango: Gran Maestro Jedi',
                'Sabiduría: Legendaria'
            ]
        },
        {
            id: 6,
            title: 'Obi-Wan Kenobi',
            image: 'https://images.unsplash.com/photo-1546938576-7d56dda5e7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwd2FycyUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NjQ3Nzg1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            items: [
                'Especie: Humano',
                'Rango: Maestro Jedi',
                'Maestro de: Anakin Skywalker',
                'Planeta exilio: Tatooine'
            ]
        }
    ];

    const handlePersonClick = (id, title) => {
        console.log(`Person clicked: ${title} (ID: ${id})`);
    };

    const filteredPeople = peopleData.filter(person =>
        person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="section-title">
                    <i className="fas fa-users me-3"></i>
                    CHARACTERS
                </h2>
                <p className="section-subtitle">
                    <i className="fas fa-jedi me-2"></i>
                    Heroes and Villains of the Galaxy
                </p>
            </div>
            <div className="row">
                {filteredPeople.length > 0 ? (
                    filteredPeople.map((person) => (
                        <StarWarsCard
                            key={person.id}
                            image={person.image}
                            title={person.title}
                            items={person.items}
                            onClick={() => handlePersonClick(person.id, person.title)}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <div className="no-results">
                            <i className="fas fa-search fa-3x mb-3"></i>
                            <h3>No characters found</h3>
                            <p>Try adjusting your search term</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
