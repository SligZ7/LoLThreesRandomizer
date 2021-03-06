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
const imgStyling = { width: '45px', height: '45px' };
const imgContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

export default function Player({ name, role, color, winner }) {

    return (
        <Card style={{ display: 'flex', backgroundColor: winner ? 'goldenrod' : 'lightgray', marginBottom: '5px', height: '50px', width:'300px' }}>
            {color === 'blue' ? <div style={{ ...imgContainer, backgroundColor: 'MidnightBlue' }} > {role === 'Jungle' ? <img src={jungleIcon} style={imgStyling} /> : role === "Lane" ? <img src={laneIcon} style={imgStyling} /> : <img src={fillIcon} style={imgStyling} />} </div> : ''}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: '1' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: color === 'blue' ? 'flex-start' : 'flex-end', alignContent: 'space-between', flexGrow: '1' }}>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>
                        {name}
                    </Typography>
                </CardContent>
            </div>
            {color === 'red' ? <div style={{ ...imgContainer, backgroundColor: '#800000' }} >
                {role === 'Jungle' ? <img src={jungleIcon} style={imgStyling} /> : role === "Lane" ? <img src={laneIcon} style={imgStyling} /> : <img src={fillIcon} style={imgStyling} />}</div> : ''
            }
        </Card >
    );
}