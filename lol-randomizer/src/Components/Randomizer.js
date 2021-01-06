import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import InputForm from './InputForm';
import Teams from './Teams';
import Selection from './Selection';
import PlayerTable from './PlayerTable';

const Randomizer = () => {
    const [blueTeam, setBlueTeam] = useState([]);
    const [redTeam, setRedTeam] = useState([]);
    const [players, setPlayers] = useState([]);
    const [games, setGames] = useState(0);
    const [teamSizes, SetSize] = useState(3);

    /*ROLES TEMP DISABLED WHILE ADDING NEW INPUT*/
    //Expect arr to be an array of six strings
    const randomize = (arr) => {

        const teamA = [];
        //var teamARoles = ["Mid", "Jungle", "Bottom"];
        const teamB = [];
        //var teamBRoles = ["Mid", "Jungle", "Bottom"];

        /*while(arr.length > 0){
            const person = arr.splice(Math.floor(Math.random() * arr.length), 1);
            (arr.length % 2 === 0) ? teamA.push([person, teamARoles.splice(Math.floor(Math.random() * teamARoles.length), 1)]) 
                                    : teamB.push([person, teamBRoles.splice(Math.floor(Math.random() * teamBRoles.length), 1)]);
        }*/
        const tempPlayers = [];
        arr.forEach(element => {
            if (players.findIndex(player => player.name === element) === -1) {
                tempPlayers.push({
                    name: element,
                    wins: 0,
                    loses: 0,
                });
            }
        });
        setPlayers([...players, ...tempPlayers]);

        while (arr.length > 0) {
            const person = arr.splice(Math.floor(Math.random() * arr.length), 1);
            (arr.length % 2 === 0) ? teamA.push(person)
                : teamB.push(person);
        }

        setBlueTeam(teamA);
        setRedTeam(teamB);
    }

    const handleSizeChange = (e) => {
        SetSize(e.target.value);
    }

    const handleRandomizeButton = () => {
        const input = document.getElementsByClassName('person');

        //Convert HTML Collection to Array
        let persons = [].slice.call(input);
        persons = persons.map((person, index) => {
            return (person.value) ? person.value : "Person " + (index + 1);
        });
        randomize(persons);
    }

    const handleBlueWinButton = () => {
        redTeam.forEach(element => {
            const index = players.findIndex(player => player.name === element[0]);
            players[index].wins++;
        });
        blueTeam.forEach(element => {
            const index = players.findIndex(player => player.name === element[0]);
            players[index].loses++;
        });
        setGames(games + 1);
    }

    const handleRedWinButton = () => {
        blueTeam.forEach(element => {
            const index = players.findIndex(player => player.name === element[0]);
            players[index].wins++;
        });
        redTeam.forEach(element => {
            const index = players.findIndex(player => player.name === element[0]);
            players[index].loses++;
        });
        setGames(games + 1);
    }

    return (
        <Container>
            <Selection handleChange={handleSizeChange} />
            <InputForm handleButton={handleRandomizeButton} sizes={teamSizes} />
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 2rem 0px 2rem' }}>
                <Button variant="dark" type="button" onClick={handleBlueWinButton} style={{ backgroundColor: '#00008B' }}>
                    Blue wins
            </Button>
                <Button variant="dark" type="button" onClick={handleRedWinButton} style={{ backgroundColor: '#8B0000' }}>
                    Red wins
            </Button>
            </div>
            <Teams redTeam={redTeam} blueTeam={blueTeam} />
            <PlayerTable players={players} />
        </Container>
    );

}

export default Randomizer;