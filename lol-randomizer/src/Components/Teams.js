import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

const Teams = ({ redTeam, blueTeam, players, setAllPlayers, handleRandomize }) => {
    const [tracked, setTracked] = useState(false);

    const handlePlayAgain = () => {
        handleRandomize();
        setTracked(false);
    }

    const teamACards = blueTeam.map((person, index) => {
        return (
            <Card className="bg-dark text-white" key={index}>
                <Card.Title>{person.name}</Card.Title>
                <Card.Header>{person.role}</Card.Header>
            </Card>
        )
    });

    const teamBCards = redTeam.map((person, index) => {
        return (
            <Card className="bg-dark text-white" key={index}>
                <Card.Title>{person.name}</Card.Title>
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
                <Col style={{ width: '20rem' }}>
                    {teamBCards[index]}
                </Col>
            </Row>
        )
    });

    const handleRedWinButton = () => {
        redTeam.forEach(element => {
            element.wins++;
        });
        blueTeam.forEach(element => {
            element.loses++;
        });
        setAllPlayers([...players]);
        setTracked(true);
    }

    const handleBlueWinButton = () => {
        blueTeam.forEach(element => {
            element.wins++;
        });
        redTeam.forEach(element => {
            element.loses++;
        });
        setAllPlayers([...players]);
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