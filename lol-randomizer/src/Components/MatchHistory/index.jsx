import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment-timezone';
import Player from './Player';
import Typography from '@material-ui/core/Typography';
import cardBackGround from '../../Assets/bg.jpg';
import darkBg from '../../Assets/dark_bg.png';
import haIcon from '../../Assets/ha_icon.png';
import srIcon from '../../Assets/sr_icon.png';
import victoryBlueIcon from '../../Assets/trophy_blue.png';
import victoryRedIcon from '../../Assets/trophy_red.png';
import Pagination from '@material-ui/lab/Pagination';

const LIMIT = 3;
function MatchHistory(props) {

    const [matches, setMatches] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/games?page=${page}&limit=${LIMIT}`).then(({ data }) => {
            const { total, games } = data;
            setMatches(games);
            setTotal(total);
        });
    }, [page]);

    const onPageChange = (event, page) => {
        console.log('page', page);
        setPage(page);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '20px' }}>Match History</Typography>
            <Pagination onvariant="outlined" shape="rounded" count={Math.ceil(total / LIMIT)} onChange={onPageChange} style={{ marginBottom: '20px' }} />
            {matches.map(game => {
                const red = game.red.split(",");
                const blue = game.blue.split(',');
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', backgroundImage: `url(${cardBackGround})`, borderStyle: "solid", backgroundPosition: '-500px 0px', boxShadow: '4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', backgroundSize: '1500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid white', padding: '5px', fontWeight: 'bold', backgroundImage: `url(${darkBg})`, backgroundPosition: '-100px 0px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', }}>
                                {moment(game.date).tz("America/New_York").format('MMMM Do, YYYY')}
                                <div>{game.winning_side === 'blue' ? "Blue (Victory)" : "Red (Victory)"}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <img alt="" style={{ width: '50px', height: '50px' }} src={game.map === 'Howling Abyss' ? haIcon : srIcon} />
                                <div> Match Id:{game.id} - {game.map} </div>
                            </div>

                        </div>
                        <div style={{ display: 'flex', padding: '10px' }} >
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: '20px' }}  >
                                {blue.map((b, index) => {
                                    const [role, name] = b.split('-');
                                    return (<div style={{ backgroundImage: game.winning_side === 'blue' ? `url(${victoryBlueIcon})` : '', backgroundPosition: `-40px -${((index + 1) * 75) - 75}px`, marginBottom: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '400px', borderRadius: '5px', }}>
                                        <Player name={name} role={role} color="blue" winner={game.winning_side === "blue"} />
                                    </div>)
                                })}
                            </div>
                            <div  >
                                {red.map((r, index) => {
                                    const [role, name] = r.split('-');
                                    return (<div style={{ backgroundImage: game.winning_side === 'red' ? `url(${victoryRedIcon})` : '', backgroundPosition: `-55px -${((index + 1) * 75) - 75}px`, marginBottom: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '400px', borderRadius: '5px', }}>
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

