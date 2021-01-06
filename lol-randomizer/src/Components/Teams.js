import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Teams = ({ redTeam, blueTeam }) => {
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

    return (
        <div style={{ marginTop: '1%' }}>{output}</div>
    );

}

export default Teams;