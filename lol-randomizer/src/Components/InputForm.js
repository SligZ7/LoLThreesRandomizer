import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const InputForm = ({ handleButton, sizes }) => {
    let forms = [];
    for (var i = 0; i < sizes; i++) { forms.push(i + 1) }

    const createForms = (forms) => {
        return forms.map((e, index) => {
            return (
                <Row key={index}>
                    <Col>
                        <Form.Control type="text" placeholder={"Person " + (index * 2 + 1)} className="person bg-dark" key={"person-" + (index * 2 + 1)} />
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder={"Person " + (index * 2 + 2)} className="person bg-dark" key={"person-" + (index * 2 + 2)} />
                    </Col>
                </Row>
            );
        });
    }

    return (
        <Form>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }} >
                <Form.Label style={{ marginLeft: '8px' }}>Enter names:</Form.Label>
                <Button variant="dark" type="button" onClick={handleButton}>
                    Randomize
                </Button>
            </div>
            {createForms(forms)}
        </Form >
    );

}

export default InputForm;