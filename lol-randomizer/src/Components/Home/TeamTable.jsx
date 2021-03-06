import React from 'react'
import Typography from '@material-ui/core/Typography';
import PlayerCard from './Card';

const cardContainer = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
const cardStyling = { minWidth: '125px', height: '85px', marginBottom: '10px', marginRight: '10px' };

export default function TeamsTable({ team, color }) {

    return (
        <div style={cardContainer}>
            {team.map((player) =>
                <PlayerCard color={color} player={player} /> )}
        </div>
    )
}
