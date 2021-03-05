import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const cardContainer = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
const cardStyling = { minWidth: '125px', height: '85px', marginBottom: '10px', marginRight: '10px' };

export default function TeamsTable({ team, color }) {

    return (
        <div style={cardContainer}>
            {team.map((player) =>
                <Card elevation={12} style={{ ...cardStyling, backgroundColor: color === 'red' ? 'indianRed' : 'royalBlue' }}>
                    <Typography variant="h5">
                        {player.name}
                    </Typography>
                    <Typography variant="h6">
                        {player.role}
                    </Typography>
                </Card>)}
        </div>
    )
}
