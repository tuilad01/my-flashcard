import React from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { ColumnType, IColumn } from "../../interfaces/IColumn";
import Cell from "./cell";

import DataTableConst from "./data-table-const";

function Row({ rowData, columns, index, onSelect, onDelete }:
    {
        rowData: any,
        columns: IColumn[],
        index: number,
        onSelect?: (index: number) => void,
        onDelete?: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void,
    }) {


    const getKey = (columnField: string) => `${DataTableConst.COLUMN_KEY}_${columnField}_${index}`
    const getText = (value: string | number, type?: ColumnType): string => {
        if (type && type === ColumnType.DateTime)
            return moment(value).format("MM/DD/YYYY HH:mm:ss A")
        else
            return value.toString()
    }

    return (
        <tr className="data-table__row" onClick={_ => onSelect && onSelect(index)}>
            <td><input type="checkbox" checked={rowData[DataTableConst.SELECTED_FIELD_NAME]} onChange={_ => onSelect && onSelect(index)} /></td>
            <td>{index + 1}</td>

            {columns.map((col: IColumn) => {
                return (
                    <Cell text={getText(rowData[col.field], col.type)} key={getKey(col.field)} />
                )
            })}
            <td>
                <Button variant="primary" onClick={() => console.log("Edit")}>
                    Edit
                </Button>
                <Button variant="danger" className="mx-2" onClick={e => onDelete && onDelete(e, index)}>
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default Row;