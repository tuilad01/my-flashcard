import DataTable from "../components/data-table/data-table";
import Data from "../mockData";
import { useNavigate } from "react-router-dom";

import manageIndexedDb from "../datastore/manageIndexedDb";
import GroupSchema from "../datastore/schemas/group-schema";
import Group from "../interfaces/IGroup";

function HomePage() {
    let navigate = useNavigate()

    manageIndexedDb.add(GroupSchema.storeName, new Group("group 1"))

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
        <DataTable
            dataSource={Data.tableData}
            columns={Data.columns} />
    );
}

export default HomePage;