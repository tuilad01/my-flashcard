import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Row from "./row";
import './data-table.scss';

// interfaces
import { IColumn } from "../../interfaces/IColumn";
// constant
import DataTableConst from "./data-table-const";


const prepareDataSource = (dataSource: any[]) => {
    return dataSource.map(row => {
        return { ...row, [DataTableConst.SELECTED_FIELD_NAME]: false }
    })
}


function DataTable({ dataSource, columns, onAdd, onDelete, onDeleteAll, onEdit }:
    {
        dataSource: any[],
        columns: IColumn[],
        onAdd?: () => void,
        onDelete?: (item: any) => void,
        onDeleteAll?: (items: any[]) => void,
        onEdit?: (item: any) => void,
    }) {

    const mappedDataSource = prepareDataSource(dataSource);
    console.log("data table loaded")
    const [data, setData] = useState<any[]>([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);

    useEffect(() => {
        setData(mappedDataSource)
        console.log("data table useEffect")
    },[dataSource])

    const onSelect = (index: number) => {        
        data[index][DataTableConst.SELECTED_FIELD_NAME] = !data[index][DataTableConst.SELECTED_FIELD_NAME]

        const _isSelectedAll = data.filter(row => row[DataTableConst.SELECTED_FIELD_NAME]).length == data.length

        setIsSelectedAll(_isSelectedAll)
        setData([...data])
    }

    const onSelectAll = (checked: boolean) => {
        setIsSelectedAll(checked)
        const newData = data.map(row => {
            return {
                ...row,
                [DataTableConst.SELECTED_FIELD_NAME]: checked
            }
        })

        setData([...newData])
    }

    const _onAdd = () => {
        onAdd && onAdd();
    }

    const _onDelete = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.stopPropagation();

        //console.log(index);

        if (!window.confirm("Are you sure?")) return;

        if (!data[index]) return;

        data.splice(index, 1);
        setData([...data])

    }

    const _onDeleteAll = () => {
        const newData = data.filter(row => !row[DataTableConst.SELECTED_FIELD_NAME])

        setData([...newData])
    }

    const _onEdit = (index: number) => {
        onEdit && onEdit(data[index])
    }

    const onSearch = (query: string) => {
        if (!query) {
            setData([...dataSource])
            return;
        }

        dataSource = data;

        const searchableColumns = columns.filter(col => col.searchable && col.searchable)

        if (searchableColumns.length > 0) {
            const newData = data.filter(row => {
                for (let i = 0; i < searchableColumns.length; i++) {
                    const searchableColumn = searchableColumns[i];

                    if (row[searchableColumn.field].toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                        return true;
                    }
                }

                return false;
            })

            setData([...newData])
        }

    }

    const selectedCount = data.filter(row => row[DataTableConst.SELECTED_FIELD_NAME]).length
    return (
        <div className="data-table">
            <div className="data-table__control-bar">
                <div className="data-table__control-bar__left">
                    <Button variant="primary" onClick={() => _onAdd()}>
                        Add
                    </Button>
                    <Button variant="danger" className="mx-2" onClick={_onDeleteAll}>
                        Delete all {selectedCount ? `(${selectedCount})` : ""}
                    </Button>
                </div>
                <div className="data-table__control-bar__right">
                    <Form.Control type="text" placeholder="search" onChange={e => onSearch(e.currentTarget.value)} />
                </div>
            </div>
            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={isSelectedAll} onChange={e => onSelectAll(e.currentTarget.checked)} /></th>
                        <th>#</th>
                        {columns.map((column: IColumn, index: number) => {
                            return (<th key={`${DataTableConst.HEADER_COLUMN_KEY}_${index}`}>{column.displayedName}</th>)
                        })}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map((row, index) => {
                        return (
                            <Row
                                rowData={row}
                                columns={columns}
                                index={index}
                                onSelect={onSelect}
                                onDelete={_onDelete}
                                onEdit={_onEdit}
                                key={`${DataTableConst.ROW_KEY}_${index}`}
                            />
                        )
                    })}


                </tbody>
            </Table>
        </div>
    );
}

export default DataTable;