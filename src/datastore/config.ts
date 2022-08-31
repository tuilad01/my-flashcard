
import GroupSchema from "./schemas/group-schema"
import { ISchema } from "./schemas/ISchema"

export interface IConfigIndexedDb {
    schemas: ISchema[],
    database: string,
    version: number
}

/**
 * =======================================
 * Update your database infomation here...
 * =======================================
 */
const configIndexedDb: IConfigIndexedDb = {
    schemas: [
        // Group schema
        GroupSchema
    ],
    database: process.env.REACT_APP_DATABASE_NAME || "MyIndexedDb",
    version: process.env.REACT_APP_DATABASE_VERSION ? +process.env.REACT_APP_DATABASE_VERSION : 1
}


export default configIndexedDb