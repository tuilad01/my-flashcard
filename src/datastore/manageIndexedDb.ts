import configIndexedDb from "./config"
import { ISchema } from "./schemas/ISchema"

let db: IDBDatabase | null = null;

enum Mode {
    readonly= "readonly",
    readwrite= "readwrite"
}

async function connect(database: string, version: number, schemas?: ISchema[]): Promise<IDBDatabase | null> {
    const request = window.indexedDB.open(database, version);
    let objDb: IDBDatabase | null = null;

    try {
        objDb = await new Promise((resolve, reject) => {
            request.onerror = (event: any) => reject(event.target.errorCode)
            request.onsuccess = (event: any) => resolve(event.target.result)
            request.onupgradeneeded = (event: any) => {
                const objDb1 = event.target.result

                if (schemas && schemas.length > 0) {
                    for (let i = 0; i < schemas.length; i++) {
                        const schema = schemas[i];
                        const objectStore = objDb1.createObjectStore(schema.storeName, { keyPath: schema.key.keyPath, autoIncrement: schema.key.autoIncrement });

                        for (let j = 0; j < schema.indexes.length; j++) {
                            const index = schema.indexes[j];
                            objectStore.createIndex(index.name, index.field, { unique: index.unique });
                        }
                    }

                }

                resolve(objDb1)
            }
        })
    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objDb;
}

async function getAll(objectStoreName: string): Promise<any[]> {
    let objectResult: any[] = [];
    try {
        const objectStore = await GetDbObjectStore(objectStoreName);

        if (objectStore) {
            const request = objectStore.getAll()
            objectResult = await GetResult(request);

        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}

async function get(objectStoreName: string, id: string | number): Promise<any> {
    let objectResult: any = null;
    try {
        const objectStore = await GetDbObjectStore(objectStoreName);

        if (objectStore) {
            const request = objectStore.get(id)
            objectResult = await GetResult(request);

        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}

async function add(objectStoreName: string, object: any) {
    let objectResult: any = null;
    try {
        const objectStore = await GetDbObjectStore(objectStoreName, Mode.readwrite);

        if (objectStore) {
            const request = objectStore.add(object)
            objectResult = await GetResult(request);

        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}

async function update(objectStoreName: string, object: any) {
    let objectResult: any = null;
    try {
        const objectStore = await GetDbObjectStore(objectStoreName, Mode.readwrite);

        if (objectStore) {
            const request = objectStore.put(object)
            objectResult = await GetResult(request);

        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}

async function remove(objectStoreName: string, id: string | number) {
    let objectResult: any = null;
    try {
        const objectStore = await GetDbObjectStore(objectStoreName, Mode.readwrite);

        if (objectStore) {
            const request = objectStore.delete(id)
            objectResult = await GetResult(request);

        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}



async function GetDbObjectStore(objectStoreName: string, mode: Mode = Mode.readonly): Promise<IDBObjectStore | null> {
    try {
        if (!db)
            db = await connect(configIndexedDb.database, configIndexedDb.version, configIndexedDb.schemas);

        const transaction = db?.transaction([objectStoreName], mode);
        const objectStore = transaction?.objectStore(objectStoreName)

        return objectStore ? objectStore : null

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }
    return null;
}

async function GetResult(request: IDBRequest): Promise<any | any[]> {
    try {
        return await new Promise((resolve, reject) => {
            request.onerror = (event: any) => reject(event.target.errorCode)
            request.onsuccess = (event: any) => resolve(event.target.result)
        })
    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return null;
}

export default {
    getAll,
    get,
    add,
    update,
    remove
}
