import React, { useState } from "react";
import DataTable from "../components/data-table/data-table";
import Data from "../mockData";
import { useNavigate } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

import manageIndexedDb from "../datastore/manageIndexedDb";
import GroupSchema from "../datastore/schemas/group-schema";
import Group from "../interfaces/IGroup";

function HomePage() {
    let navigate = useNavigate()

    const [form, setForm] = useState<{name: string, description: string}>({name: "", description: ""});
    

    

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // if (form.name) {
        //     const group = new Group(form.name, form.description)
        //     manageIndexedDb.add(GroupSchema.storeName, group);
        // }
        
        console.log("submit")
    }

    const onChangeForm = (event: any, field: string) => {
        const value = event.currentTarget.value
        setForm(pre => ({...pre, [field]: value}));
    }

    // const onAdd = () => {
    //     navigate("/group/add")
    // }

    // const onEdit = (item: any) => {
    //     if (item && item.id) {
    //         navigate(`/group/${item.id}`)
    //     }
    // }

    // const onDelete = (item: any) => {

    // }

    // const onDeleteAll = (items: any[]) => {

    // }



    return (
        <div>
            <Form onSubmit={e => onSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={form.name} onChange={e => onChangeForm(e, "name")} placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={form.description} onChange={e => onChangeForm(e, "description")} placeholder="Description" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default HomePage;