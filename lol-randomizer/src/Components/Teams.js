import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const Teams = ({ redTeam, blueTeam, handleRandomize }) => {
    const [tracked, setTracked] = useState(false);

    const handlePlayAgain = () => {
        handleRandomize();
        setTracked(false);
    }

    const teamACards = blueTeam.map((person, index) => {
        return (
            <Card className="text-white" key={index} style={{ width: '12rem', background: 'RoyalBlue' }}>
                <Card.Title style={{ marginTop: '.5rem' }}>{person.name}</Card.Title>
                <Card.Header>{person.role}</Card.Header>
            </Card>
        )
    });

    const teamBCards = redTeam.map((person, index) => {
        return (
            <Card className="text-white" key={index} style={{ width: '12rem', background: 'IndianRed' }}>
                <Card.Title style={{ marginTop: '.5rem' }}>{person.name}</Card.Title>
                <Card.Header>{person.role}</Card.Header>
            </Card>
        )
    });

    const output = teamACards.map((card, index) => {
        return (
            <Row key={index}>
                <Col >
                    {card}
                </Col >
                <Col >
                    {teamBCards[index]}
                </Col>
            </Row>
        )
    });

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
        <div>
            {output}
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1rem 0rem 1rem 0rem' }}>
                {!tracked ? (
                    <>
                        <Button variant="dark" type="button" onClick={handleBlueWinButton} style={{ backgroundColor: '#00008B' }}>
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
        </div >
    );

}

export default Teams;