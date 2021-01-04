import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const InputForm = ({handleButton}) => {
    return (
        <Form>
            <Form.Label style={{marginLeft: '8px'}}>Enter names:</Form.Label>
            <Row>
                <Col>
                    <Form.Control type="text" placeholder="Person 1" className="person bg-dark"/>
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Person 2" className="person bg-dark"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Control type="text" placeholder="Person 3" className="person bg-dark"/>
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Person 4" className="person bg-dark"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Control type="text" placeholder="Person 5" className="person bg-dark"/>
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Person 6" className="person bg-dark"/>
                </Col>
            </Row>
            <Button variant="dark" type="button" onClick={handleButton} style={{marginLeft: '8px', marginTop: '10px'}}>
                Randomize
            </Button>
        </Form>
    );

}

export default InputForm;