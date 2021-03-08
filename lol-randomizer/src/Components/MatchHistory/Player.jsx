import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import fillIcon from '../../Assets/fill_icon.png';
import jungleIcon from '../../Assets/jungle_icon.png';
import laneIcon from '../../Assets/lane_icon.png';




// TODO: make utils function to get color based on winrate
const imgStyling = { width: '45px', height: '45px' };
const imgContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
const textshadow = {
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


export default function Player({ name, role, champ, color, winner }) {

    return (
        <Card style={{
            display: 'flex', height: '75px', width: '300px', backgroundColor: (color === 'blue' && winner) ? `rgba(0, 0, 175, .1)` : (color === 'red' ? `rgba(255, 0, 0, .4)` : 'rgba(0, 0, 255, .3)')
        }}>
            {color === 'blue' ? <div style={{ ...imgContainer, backgroundColor: 'MidnightBlue', opacity: '1' }} > {role === 'Jungle' ? <img alt="" src={jungleIcon} style={imgStyling} /> : role === "Lane" ? <img alt="" src={laneIcon} style={imgStyling} /> : <img alt="" src={fillIcon} style={imgStyling} />} </div> : ''
            }
            < div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: '1' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: color === 'blue' ? 'flex-start' : 'flex-end', alignContent: 'space-between', flexGrow: '1' }}>
                    <Typography variant="body2" style={textshadow}>
                        {name ? name : champ}
                    </Typography>
                </CardContent>
            </div>
            {
                color === 'red' ? <div style={{ ...imgContainer, backgroundColor: '#800000', opacity: '1' }} >
                    {role === 'Jungle' ? <img alt="" src={jungleIcon} style={imgStyling} /> : role === "Lane" ? <img alt="" src={laneIcon} style={imgStyling} /> : <img alt="" src={fillIcon} style={imgStyling} />}</div> : ''
            }
        </Card >
    );
}