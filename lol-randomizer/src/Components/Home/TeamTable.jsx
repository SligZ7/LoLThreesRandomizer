import React from 'react'
import PlayerCard from './Card';

const cardContainer = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };

export default function TeamsTable({ team, color, isAram }) {

    return (
        <div style={cardContainer}>
            {team.map((player, index) =>
                <PlayerCard key={index} color={color} player={player}  isAram={isAram} /> )}
        </div>
    )
}
