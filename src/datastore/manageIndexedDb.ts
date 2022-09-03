import configIndexedDb from "./config"
import { ISchema } from "./schemas/ISchema"

let db: IDBDatabase | null = null;

enum Mode {
    readonly = "readonly",
    readwrite = "readwrite"
}

async function connect(database: string, version: number, schemas?: ISchema[]): Promise<IDBDatabase | null> {
    const request = window.indexedDB.open(database, version);
    let objDb: IDBDatabase | null = null;

    try {
        objDb = await new Promise((resolve, reject) => {
            request.onerror = (event: any) => reject(event.target.error.message)
            request.onsuccess = (event: any) => resolve(event.target.result)
            request.onupgradeneeded = (event: any) => {
                const objDb1 = event.target.result

                if (schemas && schemas.length > 0) {
                    let objectStore: IDBObjectStore | null = null
                    for (let i = 0; i < schemas.length; i++) {
                        const schema = schemas[i];
                        //const objectStore = objDb1.createObjectStore(schema.storeName, { keyPath: schema.key.keyPath, autoIncrement: schema.key.autoIncrement });
                        objectStore = objDb1.createObjectStore(schema.storeName, { keyPath: "key", autoIncrement: true });

                        for (let j = 0; j < schema.indexes.length; j++) {
                            const index = schema.indexes[j];
                            objectStore?.createIndex(index.name, index.field, { unique: index.unique });
                        }
                    }

                    if (objectStore)
                        objectStore.transaction.oncomplete = (event: any) => resolve(objDb1)
                }
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
        objectResult = await GetObjectByField("id", id, objectStoreName);

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}

async function getByKey(objectStoreName: string, key: number): Promise<any> {
    let objectResult: any = null;
    try {
        const objectStore = await GetDbObjectStore(objectStoreName)

        if (objectStore) {
            const request = objectStore.get(key)
            objectResult = await GetResult(request);
        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}

async function add(objectStoreName: string, object: any) {
    let objectKey: any = null;
    try {
        const objectStore = await GetDbObjectStore(objectStoreName, Mode.readwrite);

        if (objectStore) {
            const request = objectStore.add(object)
            objectKey = await GetResult(request);
        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectKey
}

async function update(objectStoreName: string, object: any) {
    let objectResult: any = null;
    try {

        //const object = await GetObjectByField("id", id, objectStoreName, Mode.readwrite);

        const objectStore = await GetDbObjectStore(objectStoreName, Mode.readwrite);
        if (objectStore) {
            //const newObject = deleteKey(object)
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
        const object = await GetObjectByField("id", id, objectStoreName);

        if (object) {
            const objectStore = await GetDbObjectStore(objectStoreName, Mode.readwrite);

            if (objectStore) {
                const request = objectStore.delete(object.key)
                objectResult = await GetResult(request);

            }

        }
    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return objectResult
}

async function GetObjectByField(field: string, value: string | number, objectStoreName: string, mode: Mode = Mode.readonly) {
    let object: any = null;
    try {
        if (!db)
            db = await connect(configIndexedDb.database, configIndexedDb.version, configIndexedDb.schemas);

        const transaction = db?.transaction([objectStoreName], mode);
        const objectStore = transaction?.objectStore(objectStoreName)

        if (objectStore) {
            object = await new Promise((resolve) => {
                objectStore.openCursor().onsuccess = (event: any) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        if (cursor.value[field] == value) {
                            resolve(cursor.value)
                        }
                        cursor.continue();
                    } else {
                        resolve(null)
                    }
                };
            })
        }

    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return object
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
            request.onerror = (event: any) => reject(event.target.error.message)
            request.onsuccess = (event: any) => resolve(event.target.result)
        })
    } catch (error) {
        console.error(`ERROR: ${error}`)
    }

    return null;
}

function deleteKey(object: any, key: string = "key") {
    const newObject: any = {};

    const keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
        const objKey = keys[i];
        if (objKey === key) continue
        newObject[objKey] = object[objKey]
    }

    return newObject
}

export default {
    getAll,
    get,
    getByKey,
    add,
    update,
    remove
}
