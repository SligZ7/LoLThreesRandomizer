import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Teams from "./Teams";
import PlayerTable from "./PlayerTable";
import DnD from "./Dnd";
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const Randomizer = () => {
    const [allPlayers, setAllPlayers] = useState([]);
    const [blueTeam, setBlueTeam] = useState([]);
    const [redTeam, setRedTeam] = useState([]);
    const [players, setPlayers] = useState({ items: [], selected: [] });
    const [forceRoles, setForceRoles] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:5000/players')

            .then(res => {
                const data = res.data;
                setAllPlayers(data);
                setPlayers({ items: data, selected: [] })
            })
    }, [])

    const handleRandomize = () => {
        const len = players.selected.length;
        if (len < 6 || len % 2 !== 0) {
            return;
        }

        let blueRoles = ["Choose your destiny", "Choose your destiny", "Choose your destiny", "Choose your destiny", "Choose your destiny"];
        let redRoles = ["Choose your destiny", "Choose your destiny", "Choose your destiny", "Choose your destiny", "Choose your destiny"];
        if (forceRoles) {
            blueRoles = ["Jungle", "Lane", "Lane"];
            redRoles = ["Jungle", "Lane", "Lane"];
            let remaining = (len % 6) / 2;
            while (remaining > 0) {
                blueRoles.push("Lane");
                redRoles.push("Lane");
                remaining--;
            }
        }

        const playerClone = Array.from(players.selected);
        const rTeam = [];
        const bTeam = [];
        while (playerClone.length > 0) {
            const [person] = playerClone.splice(Math.floor(Math.random() * playerClone.length), 1);
            if (playerClone.length % 2 === 0) {
                const [role] = redRoles.splice(Math.floor(Math.random() * redRoles.length), 1);
                person.role = role;
                rTeam.push(person);

            } else {
                const [role] = blueRoles.splice(Math.floor(Math.random() * blueRoles.length), 1);
                person.role = role;
                bTeam.push(person);
            }
        }
        setBlueTeam(rTeam);
        setRedTeam(bTeam);
    }


    const handleRolesToggle = () => {
        setForceRoles(!forceRoles);
    };

    return (
        <div style={{ backgroundColor: '#333333', padding: '5rem 15rem 0rem 15rem' }}>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "start", marginBottom: "5rem" }}>
                <DnD players={players} setPlayers={setPlayers} handleRandomize={handleRandomize} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '40rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '3rem' }}>
                        <FormControlLabel
                            control={<Switch checked={forceRoles} onChange={handleRolesToggle} name="roles" inputProps={{ 'aria-label': 'checkbox with default color' }} />}
                            label="Force roles"
                        />
                        <Button type="button" variant="secondary" onClick={handleRandomize} style={{ width: '10rem' }} disabled={players.selected.length < 6 || players.selected.length % 2 !== 0}>
                            Randomize
                 </Button>
                    </div>
                    {redTeam.length > 0 && blueTeam.length > 0 &&
                        <Teams redTeam={redTeam} blueTeam={blueTeam} players={allPlayers} setAllPlayers={setAllPlayers} handleRandomize={handleRandomize} />}
                </div>
                <PlayerTable allPlayers={allPlayers} />
            </div>
        </div>
    );

}

export default Randomizer;