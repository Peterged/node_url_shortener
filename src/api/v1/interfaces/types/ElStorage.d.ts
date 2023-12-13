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
    new(databaseName: string, _data?: object): void;

    createDatabase: (databaseName: string) => Promise<Omit<Required<ElStorageLog>, "status">>;
    updateDatabase: (databaseData: ElStorageObject | object) => Promise<ElStorageLog>;
    getDatabaseSync: (databaseName: string) => ElStorageObject | undefined;
    getDatabase:    (databaseName: string) => Promise<ElStorageObject>;
    deleteDatabase: (databaseName: string) => Promise<ElStorageLog>;
    listDatabases:  (folderPath: string | "default") => Promise<string[] | object[]>;
    clearDatabase:  (databaseName: string) => Promise<ElStorageLog | void>;

    // Data CRUD Functions
    writeValue:  (key: string, value: unknown, _pathToObject?: string) => Promise<ElStorageLog>;
    updateValue: (key: string, value: unknown) => Promise<ElStorageLog>;
    deleteValue: (key: string) => Promise<ElStorageLog>;

    getValue:         (path: string, key: string) => Promise<object | object[]>;
    getValueByFilter: (path: string, fn: (key: string, value: unknown) => boolean) => Promise<object[] | object>;
}


export default ElStorageInterface;
export type { ElStorageObject, ElStorageLog }