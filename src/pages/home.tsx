import DataTable from "../components/data-table/data-table";
//import Data from "../mockData";
import { useNavigate } from "react-router-dom";

import manageIndexedDb from "../datastore/manageIndexedDb";
import GroupSchema from "../datastore/schemas/group-schema";
import Group, { IGroup } from "../interfaces/IGroup";
import { ColumnType, IColumn } from "../interfaces/IColumn";
import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

const columns: IColumn[] = [
    {
        displayedName: "Name",
        field: "name",
        searchable: true,
    },
    {
        displayedName: "Description",
        field: "description",
    },
    {
        displayedName: "Sentence count",
        field: "sentenceCount",
    },
    {
        displayedName: "Priority",
        field: "priority",
    },
    {
        displayedName: "Count",
        field: "count",
    },
    {
        displayedName: "Updated at",
        field: "updatedAt",
        type: ColumnType.DateTime
    },
    {
        displayedName: "Created at",
        field: "createdAt",
        type: ColumnType.DateTime
    },
]



function HomePage() {
    const [data, setData] = useState<any[]>([]);

    let navigate = useNavigate()
    console.log("home render data:")
    useEffect(() => {
        //manageIndexedDb.add(GroupSchema.storeName, new Group("group 1"))
        manageIndexedDb.getAll(GroupSchema.storeName)
            .then(groups => {
                const newData = groups.map((group: IGroup) => {
                    return { ...group, sentenceCount: group.sentences.length }
                })
                setData([...newData])
            })
    }, [])

    const onAdd = () => {
        navigate("/group/add")
    }

    const onEdit = (item: any) => {
        if (item && item.id) {
            navigate(`/group/${item.id}`)
        }
    }

    const onDelete = (item: any) => {

    }

    const onDeleteAll = (items: any[]) => {

    }


    return (
        <Container>
            <DataTable
                dataSource={data}
                columns={columns}
                onAdd={onAdd}
                onEdit={onEdit} />
        </Container>

    );
}

export default HomePage;