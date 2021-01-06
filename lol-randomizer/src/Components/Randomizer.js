import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
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

    return (
        <Container>
            <Selection handleChange={handleSizeChange} />
            <InputForm handleButton={handleRandomizeButton} sizes={teamSizes} />
            <Teams redTeam={redTeam} blueTeam={blueTeam} players={players} games={games} setGames={setGames}/>
            {players.length > 0 &&
                <div style={{ marginTop: '2rem' }}><PlayerTable players={players} /></div>}
        </Container>
    );

}

export default Randomizer;