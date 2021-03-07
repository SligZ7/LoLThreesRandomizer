import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import fillIcon from '../../Assets/fill_icon.png';
import jungleIcon from '../../Assets/jungle_icon.png';
import laneIcon from '../../Assets/lane_icon.png';

// TODO: make utils function to get color based on winrate
const imgStyling = { width: '90px', height: '90px' };

const imgContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
export default function PlayerCard({ player, color, isAram }) {

    return (
        <Card style={{ display: 'flex', backgroundColor: '#DCDCDC', marginBottom: '10px', height: '100px', width: '400px' }}>
            {color === 'blue' ? <div style={{ ...imgContainer, backgroundColor: 'MidnightBlue' }} > {player.role === 'Jungle' ? <img src={jungleIcon} style={imgStyling} /> : player.role === "Lane" ? <img src={laneIcon} style={imgStyling} /> : <img src={fillIcon} style={imgStyling} />} </div> : ''}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: '1' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignContent: 'space-between', flexGrow: '1' }}>
                    <Typography variant="h4" style={{}}>
                        {player.name}
                    </Typography>
                    <Typography variant="h6">
                        {isAram ?  `${player.aram_wins} - ${player.aram_loses}`: `${player.wins} - ${player.loses}`}
                    </Typography>
                </CardContent>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', flexGrow: '1' }}>
                    <Typography variant="h4" color="textSecondary" style={{}}>
                    {isAram ?  `${player.aram_winrate}`: `${player.winrate}`}%
                    </Typography>
                </CardContent>
            </div>
            {color === 'red' ? <div style={{ ...imgContainer, backgroundColor: '#800000' }} >
                {player.role === 'Jungle' ? <img src={jungleIcon} style={imgStyling} /> : player.role === "Lane" ? <img src={laneIcon} style={imgStyling} /> : <img src={fillIcon} style={imgStyling} />}</div> : ''
            }
        </Card >
    );
}