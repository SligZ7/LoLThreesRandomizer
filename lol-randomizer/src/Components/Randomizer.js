import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Teams from "./Teams";
import PlayerTable from "./PlayerTable";
import DnD from "./Dnd";
import axios from 'axios';

const Randomizer = () => {
    const [allPlayers, setAllPlayers] = useState([]);
    const [blueTeam, setBlueTeam] = useState([]);
    const [redTeam, setRedTeam] = useState([]);
    const [players, setPlayers] = useState({ items: [], selected: [] });

    useEffect(() => {
        axios.get('http://localhost:5000/players')
            .then(res => {
                const data = res.data;
                console.log('data', data);
                setAllPlayers(data);
                setPlayers({items: data, selected: []})
            })
    }, [])

    const handleRandomize = () => {
        const len = players.selected.length;
        if (len < 6 || len % 2 !== 0) {
            return;
        }
        const blueRoles = ["jungle", "lane", "lane"];
        const redRoles = ["jungle", "lane", "lane"];
        let remaining = (len % 6) / 2;
        while (remaining > 0) {
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
    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "5rem" }}>
                <DnD players={players} setPlayers={setPlayers} handleRandomize={handleRandomize} />
                {redTeam.length > 0 && blueTeam.length > 0 && (<div style={{ marginRight: "5rem", marginTop: "6rem" }}>
                    <Teams redTeam={redTeam} blueTeam={blueTeam} players={allPlayers} setAllPlayers={setAllPlayers} handleRandomize={handleRandomize} />
                </div>)}
            </div>
            <PlayerTable allPlayers={allPlayers} />
        </Container >
    );

}

export default Randomizer;