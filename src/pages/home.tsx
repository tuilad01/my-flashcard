import DataTable from "../components/data-table/data-table";
//import Data from "../mockData";
import { useNavigate } from "react-router-dom";

import manageIndexedDb from "../datastore/manageIndexedDb";
import GroupSchema from "../datastore/schemas/group-schema";
import Group, { IGroup } from "../interfaces/IGroup";
import { ColumnType, IColumn } from "../interfaces/IColumn";
import React, { useEffect, useState } from "react";

import "./home.scss";

// react bootstrap components
import { Container } from "react-bootstrap";
import { Form, Button, Row, Col } from "react-bootstrap";
import Sentence, { ISentence } from "../interfaces/ISentence";


const ELEMENT_SENTENCE_KEY = "eIDdjk2"
// const columns: IColumn[] = [
//     {
//         displayedName: "Name",
//         field: "name",
//         searchable: true,
//     },
//     {
//         displayedName: "Description",
//         field: "description",
//     },
//     {
//         displayedName: "Sentence count",
//         field: "sentenceCount",
//     },
//     {
//         displayedName: "Priority",
//         field: "priority",
//     },
//     {
//         displayedName: "Count",
//         field: "count",
//     },
//     {
//         displayedName: "Updated at",
//         field: "updatedAt",
//         type: ColumnType.DateTime
//     },
//     {
//         displayedName: "Created at",
//         field: "createdAt",
//         type: ColumnType.DateTime
//     },
// ]



function HomePage() {
    const [form, setForm] = useState<{ name: string, description: string, sentences: ISentence[] }>({
        name: "",
        description: "",
        sentences: []
    });

    let navigate = useNavigate()
    useEffect(() => {
        //manageIndexedDb.add(GroupSchema.storeName, new Group("group 1"))
        // manageIndexedDb.getAll(GroupSchema.storeName)
        //     .then(groups => {
        //         const newData = groups.map((group: IGroup) => {
        //             return { ...group, sentenceCount: group.sentences.length }
        //         })
        //         setData([...newData])
        //     })
    }, [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(form)

        if (!form.name) return;
        const group = new Group(form.name, form.description, form.sentences)
        //SaveGroup(group)
        console.log(group)
    }

    const onAddSentence = () => {
        const sentence = new Sentence()
        setForm(pre => ({ ...pre, sentences: [...pre.sentences, sentence] }))
    }



    const onChangeForm = (event: any, field: string) => {
        const value = event.currentTarget.value
        //console.log(sentenceId)
        //console.log(form.sentences)
        setForm(pre => ({ ...pre, [field]: value })) 
    }

    const onChangeSentence = (event: any, field: string, sentence: ISentence) => {
        const value = event.currentTarget.value

        const sentenceIndex = form.sentences.findIndex(se => se.id === sentence.id)
        if (sentenceIndex >= 0) {
            form.sentences[sentenceIndex][field] = value
            setForm({...form})
        }
    }


    const SaveGroup = (group: any) => {
        const strGroups = localStorage.getItem("groups");
        if (strGroups) {
            const groups = JSON.parse(strGroups) as any[]

            groups.push(group)

            localStorage.setItem("groups", JSON.stringify(groups))
        } else {
            localStorage.setItem("groups", JSON.stringify([group]))
        }
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
        <Container>
            {/* <DataTable
                dataSource={data}
                columns={columns}
                onAdd={onAdd}
                onEdit={onEdit} /> */}
            <Form onSubmit={e => onSubmit(e)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={form.name} onChange={e => onChangeForm(e, "name")} placeholder="Name..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={form.description} onChange={e => onChangeForm(e, "description")} placeholder="Description..." />
                </Form.Group>

                <div className="sentence-panel">
                    <Button variant="primary" onClick={() => onAddSentence()}>
                        Add
                    </Button>

                    {/* <Form.Group className="mb-3">
                        <Form.Label>Vi</Form.Label>
                        <Form.Control type="text" value={form.sentences[]} onChange={e => onChangeForm(e, "name")} placeholder="Vi..." />
                    </Form.Group> */}
                    {form.sentences.map((sentence, index) => {
                        return (
                            <div key={sentence.id} className="sentence-panel__item">
                                <Form.Group>
                                    <Form.Label>Vi</Form.Label>
                                    <Form.Control type="text" value={sentence.vi} onChange={e => onChangeSentence(e, "vi", sentence)} placeholder="Vi..." />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>En</Form.Label>
                                    <Form.Control type="text" value={sentence.en} onChange={e => onChangeSentence(e, "en", sentence)} placeholder="En..." />
                                </Form.Group>
                            </div>

                        )
                    })}

                </div>
                {/* <Form.Group className="mb-3">
                    <Form.Label>Sentences</Form.Label>
                    <Form.Control as="textarea" value={form.sentences} onChange={e => onChangeForm(e, "sentences")} placeholder="Sentences..." style={{ height: '100px' }}/>
                </Form.Group> */}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </Container>

    );
}

export default HomePage;