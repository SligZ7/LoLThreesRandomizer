import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Teams = ({teams}) => {
    const teamACards = teams[0].map((person, index) => {
        return (
            <Card className="bg-dark text-white">
                <Card.Title>{person[0]}</Card.Title>
                <Card.Header>{person[1]}</Card.Header>
            </Card>
        )
    });

    const teamBCards = teams[1].map((person, index) => {
        return (
            <Card className="bg-dark text-white">
                <Card.Title>{person[0]}</Card.Title>
                <Card.Header>{person[1]}</Card.Header>
            </Card>
        )
    });

    const output = teamACards.map((card, index) => {
        return (
            <Row>
                <Col>
                    {card}
                </Col>
                <Col>
                    {teamBCards[index]}
                </Col>
            </Row>
        )
    });
    console.log(teamACards)
    console.log(output[0]);

    return (
        <p style={{marginTop: '1%'}}>{output}</p>
    );

}

export default Teams;