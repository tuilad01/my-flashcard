import { ISchema } from "./ISchema"

const GroupSchema: ISchema = {
    storeName: "Group",
    key: { keyPath: "id", autoIncrement: true },
    indexes: [
        {
            name: "id_index",
            field: "id",
            unique: true
        }
    ],
}


export default GroupSchema