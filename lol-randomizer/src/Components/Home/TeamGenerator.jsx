import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TeamTable from './TeamTable';

const Teams = ({ setAvailable, selected, setSelected }) => {
    const [tracked, setTracked] = useState(false);
    const [blueTeam, setBlueTeam] = useState([]);
    const [redTeam, setRedTeam] = useState([]);
    const [forceRoles, setForceRoles] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/players')
            .then(({ data }) => {
                if (localStorage.getItem('selected') || localStorage.getItem('available')) {
                    setAvailable(JSON.parse(localStorage.getItem('available') || []));
                    setSelected(JSON.parse(localStorage.getItem('selected') || []));
                } else {
                    const newData = data.slice();
                    newData.sort((a, b) => b.wins - a.wins || a.loses - b.loses);
                    setAvailable(newData);
                };

                if (localStorage.getItem('redTeam') || localStorage.getItem('blueTeam')) {
                    const redLocal = JSON.parse(localStorage.getItem('redTeam'));
                    const blueLocal = JSON.parse(localStorage.getItem('blueTeam'));
                    const redLatest = data.filter((d) => redLocal.some(red => red.id === d.id));
                    const blueLatest = data.filter((d) => blueLocal.some(blue => blue.id === d.id));
                    setBlueTeam(blueLatest);
                    setRedTeam(redLatest);
                }
            })
    }, [])

    const handleRandomize = () => {
        const len = selected.length;
        if (len < 6 || len % 2 !== 0) {
            return;
        }

        let blueRoles = ["Any", "Any", "Any", "Any", "Any"];
        let redRoles = ["Any", "Any", "Any", "Any", "Any"];

        if (forceRoles) {
            blueRoles = ["Jungle", "Lane", "Lane", "Lane", "Lane"];
            redRoles = ["Jungle", "Lane", "Lane", "Lane", "Lane"];
        }

        const playerClone = Array.from(selected);
        const rTeam = [];
        const bTeam = [];

        while (playerClone.length > 0) {
            const [person] = playerClone.splice(Math.floor(Math.random() * playerClone.length), 1);
            if (playerClone.length % 2 === 0) {
                const [role] = redRoles.splice(Math.floor(Math.random() * playerClone.length), 1);
                person.role = role;
                rTeam.push(person);
            } else {
                const [role] = blueRoles.splice(Math.floor(Math.random() * playerClone.length), 1);
                person.role = role;
                bTeam.push(person);
            }
        }
        setBlueTeam(rTeam);
        setRedTeam(bTeam);
        localStorage.setItem('redTeam', JSON.stringify(rTeam));
        localStorage.setItem('blueTeam', JSON.stringify(bTeam));
    }

    const handlePlayAgain = () => {
        handleRandomize();
        setTracked(false);
    }

    const handleRolesToggle = () => {
        setForceRoles(!forceRoles);
    };

    const handleRedWinButton = () => {
        const winnersArray = [];
        const losersArray = [];
        const loserIdsArray = [];
        const winnerIdsArray = [];

        redTeam.forEach(element => {
            winnersArray.push(`${element.name}-${element.id}`);
            winnerIdsArray.push(element.id);
            element.wins++;
        });

        blueTeam.forEach(element => {
            losersArray.push(`${element.name}-${element.id}`);
            loserIdsArray.push(element.id);
            element.loses++;
        });

        const losers = losersArray.join(',');
        const winners = winnersArray.join(',');
        const loserIds = loserIdsArray.join(',');
        const winnerIds = winnerIdsArray.join(',');

        axios.post('http://localhost:5000/games',
            { game_size: redTeam.length, winners, losers, winning_side: 'red', loserIds, winnerIds });
        setTracked(true);
    }

    const handleBlueWinButton = () => {
        const winnersArray = [];
        const losersArray = [];
        const loserIdsArray = [];
        const winnerIdsArray = [];

        blueTeam.forEach(element => {
            winnersArray.push(`${element.name}-${element.id}`);
            winnerIdsArray.push(element.id);
            element.wins++;
        });

        redTeam.forEach(element => {
            losersArray.push(`${element.name}-${element.id}`);
            loserIdsArray.push(element.id);
            element.loses++;
        });

        const losers = losersArray.join(',');
        const winners = winnersArray.join(',');
        const loserIds = loserIdsArray.join(',');
        const winnerIds = winnerIdsArray.join(',');

        axios.post('http://localhost:5000/games',
            { game_size: redTeam.length, winners, losers, winning_side: 'blue', loserIds, winnerIds });
        setTracked(true);
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '3rem' }}>
                <FormControlLabel
                    control={<Switch checked={forceRoles} onChange={handleRolesToggle} name="roles" inputProps={{ 'aria-label': 'checkbox with default color' }} />}
                    label="Force roles"
                />
                <Button type="button" variant="primary" onClick={handleRandomize} style={{ width: '10rem' }} disabled={selected.length < 6 || selected.length % 2 !== 0}>
                    Randomize
                </Button>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '10px' }}>
                    <TeamTable team={blueTeam} color="blue" />
                </div>
                <TeamTable team={redTeam} color="red" />
            </div>
            <div>
                {!tracked ? (
                    <>
                        <Button variant="dark" type="button" onClick={handleBlueWinButton} style={{ backgroundColor: '#00008B', marginRight: '2rem' }}>
                            Blue wins
                        </Button>
                        <Button variant="dark" type="button" onClick={handleRedWinButton} style={{ backgroundColor: '#8B0000' }}>
                            Red wins
                         </Button>
                    </>) :
                    (
                        <Button variant="dark" type="button" onClick={handlePlayAgain}>
                            Play again
                         </Button>
                    )}
            </div>
        </div>
    );

}

export default Teams;