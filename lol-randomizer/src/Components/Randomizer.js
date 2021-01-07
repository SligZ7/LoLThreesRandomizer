import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Teams from './Teams';
import PlayerTable from './PlayerTable';
import DnD from './Dnd';

const ppl =
    [{ id: '1', name: 'Sachin', wins: 0, loses: 0, role: 'jungler' },
    { id: '2', name: 'Zack', wins: 0, loses: 0, role: 'jungler' },
    { id: '3', name: 'Noel', wins: 0, loses: 0, role: 'jungler' },
    { id: '4', name: 'Parth', wins: 0, loses: 0, role: 'jungler' },
    { id: '5', name: 'Mark', wins: 0, loses: 0, role: 'jungler' },
    { id: '6', name: 'Jonah', wins: 0, loses: 0, role: 'jungler' },
    { id: '7', name: 'Jiali', wins: 0, loses: 0, role: 'jungler' },
    { id: '8', name: 'Muhammed', wins: 0, loses: 0, role: 'jungler' },
    { id: '9', name: 'Zach', wins: 0, loses: 0, role: 'jungler' },
    { id: '10', name: 'Kyle', wins: 0, loses: 0, role: 'jungler' }]
const Randomizer = () => {
    const [allPlayers, setAllPlayers] = useState(ppl);
    const [blueTeam, setBlueTeam] = useState([]);
    const [redTeam, setRedTeam] = useState([]);
    const [players, setPlayers] = useState({ items: ppl, selected: [] });
    
    const handleRandomize = () => {
        const len = players.selected.length;
        if (len < 6 || len % 2 !== 0) {
            return;
        }
        const blueRoles = ["jungle", "lane", "lane"];
        const redRoles = ["jungle", "lane", "lane"];
        let remaining = len % 6;
        while (remaining >= 1) {
            blueRoles.push("lane");
            redRoles.push("lane");
            remaining--;
        }
        const playerClone = Array.from(players.selected);
        const rTeam = [];
        const bTeam = [];
        while (playerClone.length > 0) {
            const [person] = playerClone.splice(Math.floor(Math.random() * playerClone.length), 1);
            if (playerClone.length % 2 === 0) {
                const [role] = redRoles.splice(Math.floor(Math.random() * redRoles.length), 1);
                person.role=role;
                rTeam.push(person);

            } else {
                const [role] = blueRoles.splice(Math.floor(Math.random() * blueRoles.length), 1);
                person.role=role;
                bTeam.push(person);
            }
        }
        setBlueTeam(rTeam);
        setRedTeam(bTeam);
    }
    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '5rem' }}>
                <DnD players={players} setPlayers={setPlayers} handleRandomize={handleRandomize} />
                {redTeam.length > 0 && blueTeam.length > 0 && (<div style={{ marginRight: '5rem', marginTop: '6rem' }}>
                    <Teams redTeam={redTeam} blueTeam={blueTeam} players={players} setAllPlayers={setAllPlayers} handleRandomize={handleRandomize} />
                </div>)}
            </div>
            <PlayerTable allPlayers={allPlayers} />
        </Container >
    );

}

export default Randomizer;