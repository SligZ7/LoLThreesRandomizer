import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import fillIcon from '../../Assets/fill_icon.png';
import jungleIcon from '../../Assets/jungle_icon.png';
import laneIcon from '../../Assets/lane_icon.png';
import victoryIcon from '../../Assets/victory.png';



// TODO: make utils function to get color based on winrate
const imgStyling = { width: '45px', height: '45px' };
const imgContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

export default function Player({ name, role, color, winner }) {

    return (
        <Card style={{ display: 'flex', marginBottom: '5px', height: '75px', width: '300px' }}>
            {color === 'blue' ? <div style={{ ...imgContainer, backgroundColor: 'MidnightBlue' }} > {role === 'Jungle' ? <img alt="" src={jungleIcon} style={imgStyling} /> : role === "Lane" ? <img alt="" src={laneIcon} style={imgStyling} /> : <img alt="" src={fillIcon} style={imgStyling} />} </div> : ''}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: '1' }}>
                <div>
                    {winner && color === 'red' && <img alt="" src={victoryIcon} style={{ width: '75px', height: '75px' }} />}
                </div>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: color === 'blue' ? 'flex-start' : 'flex-end', alignContent: 'space-between', flexGrow: '1' }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                </CardContent>
                <div>
                    {winner && color === 'blue' && <img alt="" src={victoryIcon} style={{ width: '75px', height: '75px' }} />}
                </div>

            </div>
            {color === 'red' ? <div style={{ ...imgContainer, backgroundColor: '#800000' }} >
                {role === 'Jungle' ? <img alt="" src={jungleIcon} style={imgStyling} /> : role === "Lane" ? <img alt="" src={laneIcon} style={imgStyling} /> : <img alt="" src={fillIcon} style={imgStyling} />}</div> : ''
            }
        </Card >
    );
}