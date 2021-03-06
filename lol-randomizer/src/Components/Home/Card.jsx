import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


// TODO: make utils function to get color based on winrate

export default function PlayerCard({ player, color }) {

    return (
        <Card style={{ display: 'flex', backgroundColor: 'LightSteelBlue', marginBottom: '10px' }}>
            {color === 'blue' ? <div style={{ backgroundColor: 'royalblue', width: '20px' }} /> : ''}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: '1' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: '1' }}>
                    <Typography component="h5" variant="h5" style={{ marginBottom: '10px' }}>
                        {player.name}
                    </Typography>
                    <Typography component="h6" color="textSecondary">
                        {player.role === 'jungler' ? 'Any' : player.role}
                    </Typography>
                </CardContent>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', alignContent: 'space-between', flexGrow: '1' }}>
                    <Typography component="h5" color="textSecondary" style={{ marginBottom: '20px' }}>
                        {player.winrate}%
                </Typography>
                    <Typography variant="body2">
                        {`${player.wins} - ${player.loses}`}
                    </Typography>
                </CardContent>
            </div>
            {color === 'red' ? <div style={{ backgroundColor: 'indianred', width: '20px'}} /> : ''}
        </Card>
    );
}