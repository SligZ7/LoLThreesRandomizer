import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TeamTable from './TeamTable';
import moment from 'moment-timezone';
import GameWinDialog from './GameWinDialog';

const Teams = ({ setAvailable, selected, setSelected }) => {
    const [tracked, setTracked] = useState(false);
    const [blueTeam, setBlueTeam] = useState([]);
    const [redTeam, setRedTeam] = useState([]);
    const [isAram, setIsAram] = useState(JSON.parse(localStorage.getItem('isAram')) || false);
    const [forceRoles, setForceRoles] = useState(JSON.parse(localStorage.getItem('forceRoles')) || false);
    const map = useMemo(() => isAram ? 'Howling Abyss' : 'Summoner\'s Rift', [isAram]);
    const [open, setOpen] = React.useState(false);
    const [winner, setWinner] = React.useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/players')
            .then(({ data }) => {

                // If we already have selected or available get them from local storage, otherwise use the fetched data
                if (localStorage.getItem('selected') || localStorage.getItem('available')) {
                    setAvailable(JSON.parse(localStorage.getItem('available') || []));
                    setSelected(JSON.parse(localStorage.getItem('selected') || []));
                } else {
                    const newData = data.slice();
                    // newData.sort((a, b) => b.wins - a.wins || a.loses - b.loses);
                    setAvailable(newData);
                };

                //  Fetch latest for redTeam, blueTeam even if we have it in storage
                if (localStorage.getItem('redTeam') || localStorage.getItem('blueTeam')) {
                    const blueLocal = JSON.parse(localStorage.getItem('blueTeam'));
                    const redLocal = JSON.parse(localStorage.getItem('redTeam'));

                    const blueLatest = blueLocal.map(blue => Object.assign(blue, data.find(x => x.id === blue.id)));
                    const redLatest = redLocal.map(red => Object.assign(red, data.find(x => x.id === red.id)));

                    setBlueTeam(blueLatest);
                    setRedTeam(redLatest);
                }
            });
    }, [setAvailable, setSelected])

    useEffect(() => {
        if (redTeam.length && blueTeam.length) {
            localStorage.setItem('redTeam', JSON.stringify(redTeam));
            localStorage.setItem('blueTeam', JSON.stringify(blueTeam));
        }
    }, [redTeam, blueTeam]);

    const handleRotatePlayers = () => {
        if (selected.length !== 4) {
            return;
        }

        const playerClone = Array.from(selected);
        const temp1 = playerClone.slice(0, 1);
        const temp2 = playerClone.slice(1, 4);
        temp2.unshift(temp2.pop());

        playerClone[0].role = "Fill";
        playerClone[1].role = "Fill";
        playerClone[2].role = "Fill";
        playerClone[3].role = "Fill";

        const rTeam = [playerClone[0], playerClone[2]];
        const bTeam = [playerClone[1], playerClone[3]];

        setBlueTeam(bTeam);
        setRedTeam(rTeam);
        setSelected([...temp1, ...temp2]);
    };

    const handleRandomize = () => {
        const len = selected.length;

        if (len < 6 || len % 2 !== 0) {
            return;
        }

        let blueRoles = ["Fill", "Fill", "Fill", "Fill", "Fill"];
        let redRoles = ["Fill", "Fill", "Fill", "Fill", "Fill"];

        if (forceRoles && !isAram) {
            blueRoles = ["Jungle", "Lane", "Lane", "Lane", "Lane"];
            redRoles = ["Jungle", "Lane", "Lane", "Lane", "Lane"];
        }

        const playerClone = Array.from(selected);
        const rTeam = [];
        const bTeam = [];

        while (playerClone.length > 0) {
            const [person] = playerClone.splice(Math.floor(Math.random() * playerClone.length), 1);
            person.champion = "Champion";
            if (playerClone.length % 2 === 0) {
                const [role] = redRoles.splice(Math.floor(Math.random() * ((playerClone.length + 1) / 2)), 1);
                person.role = role;
                rTeam.push(person);
            } else {
                const [role] = blueRoles.splice(Math.floor(Math.random() * ((playerClone.length + 1) / 2)), 1);
                person.role = role;
                bTeam.push(person);
            }
        }

        setRedTeam(rTeam);
        setBlueTeam(bTeam);
    }

    const handlePlayAgain = () => {
        // handleRandomize();
        setTracked(false);
    }

    const handleRolesToggle = () => {
        localStorage.setItem('forceRoles', JSON.stringify(!forceRoles));
        setForceRoles(!forceRoles);
    };

    const handleAramToggle = () => {
        localStorage.setItem('isAram', JSON.stringify(!isAram));
        setIsAram(!isAram);
    }

    const handleOpenDialog = (winner) => () => {
        setWinner(winner);
        setOpen(true);
    }

    const handleGameWin = (winner) => {
        if (redTeam.some(r => r.champion === "Champion") || blueTeam.some(b => b.champion === "Champion")) {
            console.error('Cant submit without champion entries');
            return;
        }

        const winnersArray = [];
        const losersArray = [];
        const loserIdsArray = [];
        const winnerIdsArray = [];
        const redTeamArray = [];
        const blueTeamArray = [];

        if (winner === 'red') {
            redTeam.forEach(element => {
                winnersArray.push(`${element.name}-${element.id}`);
                winnerIdsArray.push(element.id);
                redTeamArray.push(`${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`);
            });

            blueTeam.forEach(element => {
                losersArray.push(`${element.name}-${element.id}`);
                loserIdsArray.push(element.id);
                blueTeamArray.push(`${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`);
            });
        } else {
            blueTeam.forEach(element => {
                winnersArray.push(`${element.name}-${element.id}`);
                winnerIdsArray.push(element.id);
                blueTeamArray.push(`${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`);
            });

            redTeam.forEach(element => {
                losersArray.push(`${element.name}-${element.id}`);
                loserIdsArray.push(element.id);
                redTeamArray.push(`${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`);
            });

        }


        const losers = losersArray.join(',');
        const winners = winnersArray.join(',');
        const loserIds = loserIdsArray.join(',');
        const winnerIds = winnerIdsArray.join(',');
        const red = redTeamArray.join(',');
        const blue = blueTeamArray.join(',');
        axios.post('http://localhost:5000/games',
            { map, game_size: redTeam.length, winners, losers, winning_side: winner, loserIds, winnerIds, blue, red, date: moment(Date.now()).tz("America/New_York").format('YYYY-MM-DD') }).then(() => setTracked(true));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GameWinDialog open={open} setOpen={setOpen} isAram={isAram} handleGameWin={handleGameWin} winner={winner} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '3rem' }}>
                <div style={{ display: 'flex' }}>
                    <FormControlLabel
                        control={<Switch checked={forceRoles} onChange={handleRolesToggle} name="roles" inputProps={{ 'aria-label': 'checkbox with default color' }} />}
                        label="Force roles"
                    />
                    <Button type="button" variant="primary" onClick={handleRandomize} style={{ width: '10rem', marginBottom: '10px' }} disabled={selected.length < 6 || selected.length % 2 !== 0}>
                        Randomize
                </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                    <FormControlLabel
                        control={<Switch checked={isAram} onChange={handleAramToggle} name="roles" inputProps={{ 'aria-label': 'checkbox with default color' }} />}
                        label="ARAM"
                    />
                    <Button type="button" variant="primary" onClick={handleRotatePlayers} style={{ width: '10rem', marginBottom: '10px' }} disabled={selected.length !== 4 || selected.length % 2 !== 0 || !isAram}>
                        Rotate
                </Button>
                </div>
            </div>
            <div style={{ display: 'flex', minHeight: '300px' }}>
                <div style={{ marginRight: '10px' }}>
                    <TeamTable team={blueTeam} setTeam={setBlueTeam} isAram={isAram} color="blue" />
                    {!tracked && <Button variant="dark" type="button" disabled={redTeam.some(r => r.champion === "Champion") || blueTeam.some(b => b.champion === "Champion")} onClick={handleOpenDialog('blue')} style={{ backgroundColor: '#00008B', marginRight: '2rem' }}>
                        Blue wins
                        </Button>}
                </div>
                <div>
                    <TeamTable team={redTeam} setTeam={setRedTeam} isAram={isAram} color="red" />
                    {!tracked && <Button variant="dark" type="button"  disabled={redTeam.some(r => r.champion === "Champion") || blueTeam.some(b => b.champion === "Champion")} onClick={handleOpenDialog('red')} style={{ backgroundColor: '#8B0000' }}>
                        Red wins
                         </Button>}
                </div>
            </div>
            <div>
                {tracked && (
                    <Button variant="dark" type="button" onClick={handlePlayAgain}>
                        Play again
                         </Button>
                )}
            </div>
        </div>
    );

}

export default Teams;