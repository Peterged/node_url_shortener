declare module 'elstorage' {
    import elstorage = require('elstorage');
    
    type ElstorageLog = {
      message: string,
      data?: ElstorageObject | string,
      status?: number | string,
    };

      type ElstorageObject = {
        databaseName: string,
        createdOn: string, // new Date().toJSON()
        updatedOn: string, // new Date().toJSON()
        totalKeys: number,
        data: object
      };

      interface ElstorageInterface {
        // Variables
        databaseName: string;
        databaseData: ElstorageObject;
        _data: ElstorageObject | object;
        message: { SUCCESS, FAILED };

        // Constructor
        new(databaseName: string, _data?: object): void;

        createDatabase: (databaseName: string) => Promise<ElstorageLog | string>;
        createDatabaseSync: (databaseName: string) => ElstorageLog | string;
        updateDatabasec: (databaseData: ElstorageObject | object) => Promise<ElstorageLog>;
        updateDatabaseSync: (databaseData: ElstorageObject | object) => ElstorageLog;
        getDatabase: (databaseName?: string) => Promise<ElstorageLog | undefined>;
        getDatabaseSync: (databaseName?: string) => ElstorageObject | string;
        deleteDatabase: (databaseName: string) => Promise<ElstorageLog>;
        deleteDatabaseSync: (databaseName: string) => ElstorageLog;
        listDatabases: <T>(folderPath: string | 'default') => Promise<T[]>;
        listDatabasesSync: <T>(folderPath: string | 'default') => T[];
        clearDatabase: (databaseName: string) => Promise<ElstorageLog | void>;
        clearDatabaseSync: (databaseName: string) => ElstorageLog | void;

        // Data CRUD Functions
        writeValue: (key: string, value: unknown, _pathToObject?: string) => Promise<ElstorageLog>;
        writeValueSync: (key: string, value: unknown, pathToObject?: string) => ElstorageLog;
        updateValue: (key: string, value: unknown) => Promise<ElstorageLog>;
        updateValueSync: (key: string, value: unknown) => ElstorageLog;
        deleteValue: (key: string) => Promise<ElstorageLog>;
        deleteValueSync: (key: string) => ElstorageLog

        getValue: (path: string, key: string) => Promise<object | object[]>;
        getValueSync: (path: string, key: string) => object | object[]
        getValueByFilter: (
          path: string, callback: (key: string, value: unknown) => boolean
        ) => Promise<object[] | object>;
        getValueByFilterSync: (
          path: string, callback: (key: string, value: unknown) => boolean
        ) => object[] | object;
      }

      export default ElstorageInterface;
      export type { ElstorageObject, ElstorageLog };
}
