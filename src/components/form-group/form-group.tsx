import { useNavigate } from "react-router-dom";

import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup';

import './form-group.scss';

function FormGroup() {
    let navigate = useNavigate()
    return (

        <div className="form-group">
            <div className="form-group__control-bar">
                <div className="form-group__control-bar__left">
                    <Button variant="info" onClick={() => navigate("/")}>
                        {"< Home"}
                    </Button>
                </div>
                <div className='form-group__control-bar__center'>
                    <span className='fw-bold'>Dat Truong</span>
                </div>
                <div className="form-group__control-bar__right">
                <Button variant="primary" onClick={() => console.log("Save")}>
                        Save
                    </Button>
                </div>
            </div>

            <Form.Group controlId="formText" className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group controlId="formText" className="mb-3">
                <Form.Label htmlFor="name">Description</Form.Label>
                <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group controlId="formText" className="mb-3">
                <Form.Label htmlFor="name">Priority</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>---</option>
                    <option value="1">vi</option>
                    <option value="2">en</option>
                </Form.Select>
            </Form.Group>

            {/*  devider */}
            <hr />

            <Form.Control type="text" placeholder="Search" />

            
        </div>
    );
}

export default FormGroup;