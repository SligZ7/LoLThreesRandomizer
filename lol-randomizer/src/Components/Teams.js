import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

const Teams = ({ redTeam, blueTeam, players, games, setGames }) => {
    const teamACards = blueTeam.map((person, index) => {
        return (
            <Card className="bg-dark text-white" key={index}>
                <Card.Title>{person[0]}</Card.Title>
                <Card.Header>{person[0]}</Card.Header>
            </Card>
        )
    });

    const teamBCards = redTeam.map((person, index) => {
        return (
            <Card className="bg-dark text-white" key={index}>
                <Card.Title>{person[0]}</Card.Title>
                <Card.Header>{person[0]}</Card.Header>
            </Card>
        )
    });

    const output = teamACards.map((card, index) => {
        return (
            <Row key={index}>
                <Col>
                    {card}
                </Col>
                <Col>
                    {teamBCards[index]}
                </Col>
            </Row>
        )
    });

    const handleRedWinButton = () => {
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

    const handleBlueWinButton = () => {
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
        <div>
            {output}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem' }}>
                <Button variant="dark" type="button" onClick={handleBlueWinButton} style={{ backgroundColor: '#00008B' }}>
                    Blue wins
            </Button>
                <Button variant="dark" type="button" onClick={handleRedWinButton} style={{ backgroundColor: '#8B0000' }}>
                    Red wins
            </Button>
            </div>
        </div>
    );

}

export default Teams;