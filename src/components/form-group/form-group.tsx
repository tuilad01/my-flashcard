import { useNavigate } from "react-router-dom";

import { Button, Col, Row, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import DataTable from "../data-table/data-table";
import Data from "../../mockData";
import './form-group.scss';
import { useEffect, useState } from "react";
import { IGroup } from "../../interfaces/IGroup";
import { IColumn } from "../../interfaces/IColumn";
// import manageIndexedDb from "../../datastore/manageIndexedDb";
// import GroupSchema from "../../datastore/schemas/group-schema";

const columns: IColumn[] = [
    {
        displayedName: "vi",
        field: "vi",
        searchable: true
    },
    {
        displayedName: "en",
        field: "en",
        searchable: true
    },
    {
        displayedName: "State",
        field: "state",
    },
]


function FormGroup({ id }: { id?: string }) {
    // const [show, setShow] = useState(false);
    // const [group, setGroup] = useState<IGroup | null>(null)

    // let navigate = useNavigate()

    // useEffect(() => {
    //     if (id) {
    //         manageIndexedDb.get(GroupSchema.storeName, id)
    //             .then(gr => {
    //                 setGroup(gr)
    //             })
    //     }
    // }, [])

    // const onClose = () => setShow(false);

    // const onAdd = () => {
    //     setShow(true);
    // }



    return (

        <>
            {/* <div className="form-group">
                <div className="form-group__control-bar">
                    <div className="form-group__control-bar__left">
                        <Button variant="info" onClick={() => navigate("/")}>
                            {"< Home"}
                        </Button>
                    </div>
                    <div className='form-group__control-bar__center'>
                        <span className='fw-bold'>{group ? group.name : ""}</span>
                    </div>
                    <div className="form-group__control-bar__right">
                        <Button variant="primary" onClick={() => console.log("Save")}>
                            Save all
                        </Button>
                    </div>
                </div>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formText" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={group?.name} placeholder="Name..." />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formText" className="mb-3">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select value={group?.priority} aria-label="Default select example">
                                <option disabled>---</option>
                                <option value="vi">vi</option>
                                <option value="en">en</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formText" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={group?.description} placeholder="Description..." />
                </Form.Group>


                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formText" className="mb-3">
                            <Form.Label>Created at</Form.Label>
                            <Form.Control type="text" value={group?.createdAt.toLocaleString()} disabled readOnly />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formText" className="mb-3">
                            <Form.Label>Updated at</Form.Label>
                            <Form.Control type="text" value={group?.createdAt.toLocaleString()} disabled readOnly />
                        </Form.Group>
                    </Col>
                </Row>

                <hr />

                <DataTable
                    dataSource={group ? group.sentences : []}
                    columns={columns}
                    onAdd={onAdd} />

            </div>

            <Modal
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formId" className="mb-3">
                        <Form.Label>id</Form.Label>
                        <Form.Control type="text" disabled readOnly />
                    </Form.Group>
                    <Form.Group controlId="formEn" className="mb-3">
                        <Form.Label>En</Form.Label>
                        <Form.Control type="text" placeholder="en..." />
                    </Form.Group>
                    <Form.Group controlId="formVi" className="mb-3">
                        <Form.Label>Vi</Form.Label>
                        <Form.Control type="text" placeholder="vi..." />
                    </Form.Group>
                    <Form.Group controlId="formSentenceCreatedAt" className="mb-3">
                        <Form.Label>Created at</Form.Label>
                        <Form.Control type="text" disabled readOnly />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" >Save</Button>
                </Modal.Footer>
            </Modal> */}

            form group
        </>
    );
}

export default FormGroup;