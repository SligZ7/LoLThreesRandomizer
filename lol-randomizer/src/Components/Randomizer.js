import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputForm from './InputForm';
import Teams from './Teams';

const Randomizer = () => {
    const [teams, SetTeams] = useState([[],[]]);

    //Expect arr to be an array of six strings
    const randomize = (arr) => {
        var teamA = [];
        var teamARoles = ["Mid", "Jungle", "Bottom"];
        var teamB = [];
        var teamBRoles = ["Mid", "Jungle", "Bottom"];

        while(arr.length > 0){
            const person = arr.splice(Math.floor(Math.random() * arr.length), 1);
            (arr.length % 2 === 0) ? teamA.push([person, teamARoles.splice(Math.floor(Math.random() * teamARoles.length), 1)]) 
                                    : teamB.push([person, teamBRoles.splice(Math.floor(Math.random() * teamBRoles.length), 1)]);
        }

        return [teamA, teamB];
    }

    const handleRandomizeButton = () => {
        const input = document.getElementsByClassName('person');
        //Convert HTML Collection to Array
        let persons = [].slice.call(input);
        persons = persons.map((person, index) => {
            return (person.value) ? person.value : "Person " + (index + 1);
        });
        persons = randomize(persons);
        SetTeams(persons);
    }


    return (
        <Container>
            <InputForm handleButton={handleRandomizeButton} />
            <Teams teams={teams} />   
        </Container>
    );

}

export default Randomizer;