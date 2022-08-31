import { ColumnType, IColumn } from "./interfaces/IColumn";

export interface Data {
    tableData: any[],
    columns: IColumn[]
}

const Data: Data = {
    tableData: [
        {
            name: "Dat 1",
            description: "description here Dat",
            totalSentence: 10,
            priority: "vi",
            count: 20,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        },
        {
            name: "Dat 2",
            description: "description here Truong",
            totalSentence: 10,
            priority: "vi",
            count: 20,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        },
        {
            name: "Dat 3",
            description: "description here Tan",
            totalSentence: 10,
            priority: "vi",
            count: 20,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        },
        {
            name: "Dat 4",
            description: "description here Tu toi",
            totalSentence: 10,
            priority: "vi",
            count: 20,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        },
    ],
    columns: [
        {
            field: "name",
            displayedName: "Name",
            searchable: true
        },
        {
            field: "description",
            displayedName: "Description",
            searchable: true
        },
        {
            field: "totalSentence",
            displayedName: "Total sentence"
        },
        {
            field: "priority",
            displayedName: "Priority"
        },
        {
            field: "count",
            displayedName: "Practice count"
        },        
        {
            field: "createdAt",
            displayedName: "Created at",
            type: ColumnType.DateTime
        },
        {
            field: "updatedAt",
            displayedName: "Updated at",
            type: ColumnType.DateTime
        },
    ]
}

export default Data