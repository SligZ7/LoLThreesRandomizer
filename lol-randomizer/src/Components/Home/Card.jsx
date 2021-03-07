import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import fillIcon from '../../Assets/fill_icon.png';
import jungleIcon from '../../Assets/jungle_icon.png';
import laneIcon from '../../Assets/lane_icon.png';

// TODO: make utils function to get color based on winrate
const imgStyling = { width: '90px', height: '90px' };

const tex = {
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'Monaco, monospace',
    color: '#FFFFFF',
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    borderColor: 'black',
    borderWidth: '20px'
};

const imgContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
export default function PlayerCard({ player, color, isAram }) {

    return (
        <Card style={{ display: 'flex', backgroundColor: '#DCDCDC', marginBottom: '10px', height: '100px', width: '400px', backgroundColor: color === 'blue' ? `rgba(0, 0, 255, .1)` : 'rgba(255, 0, 0, .2)' }}>
            {color === 'blue' ? <div style={{ ...imgContainer, backgroundColor: 'MidnightBlue' }} > {player.role === 'Jungle' ? <img src={jungleIcon} alt="" style={imgStyling} /> : player.role === "Lane" ? <img src={laneIcon} alt="" style={imgStyling} /> : <img src={fillIcon} style={imgStyling} alt="" />} </div> : ''}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: '1' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="h4" style={tex}>
                        {player.name}
                    </Typography>
                    <Typography variant="h6"  style={tex}>
                        {isAram ? `${player.aram_wins} - ${player.aram_loses}` : `${player.wins} - ${player.loses}`}
                    </Typography>
                </CardContent>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} >
                    <Typography variant="h4" color="textSecondary"  style={tex}>
                        {isAram ? `${player.aram_winrate}` : `${player.winrate}`}%
                    </Typography>
                </CardContent>
            </div>
            {color === 'red' ? <div style={{ ...imgContainer, backgroundColor: '#800000' }} >
                {player.role === 'Jungle' ? <img src={jungleIcon} alt="" style={imgStyling} /> : player.role === "Lane" ? <img src={laneIcon} alt="" style={imgStyling} /> : <img src={fillIcon} alt="" style={imgStyling} />}</div> : ''
            }
        </Card >
    );
}