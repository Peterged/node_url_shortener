

type ElStorageLog = {
    message: string,
    data?: ElStorageObject,
    status?: number | string,
}

type ElStorageObject = {
    name: string,
    createdOn: string, // new Date().toJSON()
    updatedOn: string, // new Date().toJSON()
    totalKeys: number,
    data: object
}


interface ElStorageInterface {
    // Variables
    databaseName: string;
    databaseData: ElStorageObject;

    // Constructor
    new(pathToFolder: string, databaseName: string, _data?: object): void;

    createDatabase: (databaseName: string) => Promise<Omit<Required<ElStorageLog>, "status">>;
    updateDatabase: (databaseData: ElStorageObject) => Promise<ElStorageLog>;
    getDatabase:    (databaseName: string) => Promise<ElStorageObject | string>;
    deleteDatabase: (databaseName: string) => Promise<ElStorageLog>;
    listDatabases:  (folderPath: string | "default") => Promise<string[] | object[]>;
    clearDatabase:  (databaseName: string) => Promise<ElStorageLog | void>;

    // Data CRUD Functions
    writeValue:  (key: string, value: any, _pathToObject?: string) => Promise<ElStorageLog>;
    updateValue: (key: string, value: any) => Promise<ElStorageLog>;
    deleteValue: (key: string) => Promise<ElStorageLog>;

    getValue:         (path: string, key: string) => Promise<object | object[]>;
    getValueByFilter: (path: string, fn: (key: string, value: any) => boolean) => Promise<object[] | object>;
}


export default ElStorageInterface;
export type { ElStorageObject, ElStorageLog }