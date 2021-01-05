import React from 'react';
import Form from 'react-bootstrap/Form';


const Selection = ({handleChange}) => {

    return (
        <Form>
            <Form.Group controlId="TeamSizeSelect">
                <Form.Label style={{marginLeft: '8px'}}>Select Team Sizes:</Form.Label>
                <Form.Control as="select" className="bg-dark text-white" onChange={handleChange} defaultValue="3">
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Form.Control>
            </Form.Group>
        </Form>
    );

}

export default Selection;