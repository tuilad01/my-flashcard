export interface ISchema {
    storeName: string,
    key: { keyPath: string, autoIncrement: boolean },
    indexes: {
        name: string,
        field: string,
        unique: boolean
    }[],
}