import React from 'react'
import PlayerCard from './Card';
import vayne from '../../Assets/vayne.png';
import shyvana from '../../Assets/shyv.png';

const cardContainer = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };

export default function TeamsTable({ team, color, isAram }) {

    return (
        <div style={cardContainer}>
            {team.map((player, index) =>
                <div style={{ height: '100px', backgroundImage: color === 'blue' ? `url(${vayne})` : `url(${shyvana})`, backgroundPosition: color === 'blue' ? `25px -${((index + 1) * 100)-100}px` : `-200px -${((index + 1) * 100)- 100}px`, backgroundRepeat: 'no-repeat', backgroundSize: '900px', marginBottom: '10px' }}>
                    <PlayerCard key={index} color={color} player={player} isAram={isAram} />
                </div>)}

        </div>
    )
}
