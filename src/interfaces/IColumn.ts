export enum ColumnType {
    Text = "text",
    Number = "number",
    DateTime = "dateTime",
}

export interface IColumn {
    field: string,
    displayedName: string,
    type?: ColumnType,
    searchable?: boolean
}