import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import Player from './Player';
import Typography from '@material-ui/core/Typography';
import cardBackGround from '../../Assets/bg.png';
import haIcon from '../../Assets/ha_icon.png';
import srIcon from '../../Assets/sr_icon.png';

function MatchHistory(props) {

    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/games').then(({ data }) => {
            setGames(data.reverse());
        });
    }, []);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '20px' }}>Match History</Typography>
            {games.map(game => {
                console.log('g', game);
                if (!game.red || !game.blue) {
                    return;
                }

                const red = game.red.split(",");
                const blue = game.blue.split(',');
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', backgroundImage: `url(${cardBackGround})`, borderStyle: "solid", borderRadius: '5px', boxShadow: '4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid white', padding: '5px', fontWeight: 'bold' }}>
                            <div>
                                {moment(game.date).format('MMMM Do, YYYY')}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end' }}>
                                <img style={{ width: '50px', height: '50px' }} src={game.map === 'Howling Abyss' ? haIcon : srIcon} />
                                <div>{game.map}</div>
                            </div>

                        </div>
                        <div style={{ display: 'flex', padding: '10px' }} >
                            <div style={{ marginRight: '20px' }}>
                                {blue.map((b) => {
                                    const [role, name] = b.split('-');
                                    return (<div>
                                        <Player name={name} role={role} color="blue" winner={game.winning_side === "blue"} />
                                    </div>)
                                })}
                            </div>
                            <div  >
                                {red.map((r) => {
                                    const [role, name] = r.split('-');
                                    return (<div>
                                        <Player name={name} role={role} color="red" winner={game.winning_side === "red"} />
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div >
    );
}


export default MatchHistory;

