type ElStorageLog = {
  message: string,
  data?: ElStorageObject,
  status?: number | string,
};

type ElStorageObject = {
  databaseName: string,
  createdOn: string, // new Date().toJSON()
  updatedOn: string, // new Date().toJSON()
  totalKeys: number,
  data: object
};

interface ElStorageInterface {
  // Variables
  databaseName: string;
  databaseData: ElStorageObject;
  _data: ElStorageObject | object;
  message: { SUCCESS, FAILED };

  // Constructor
  new(databaseName: string, _data?: object): void;

  createDatabase: (databaseName: string) => Promise<ElStorageLog>;
  createDatabaseSync: (databaseName: string) => ElStorageLog;
  updateDatabasec: (databaseData: ElStorageObject | object) => Promise<ElStorageLog>;
  updateDatabaseSync: (databaseData: ElStorageObject | object) => ElStorageLog;
  getDatabase: (databaseName?: string) => Promise<ElStorageLog | undefined>;
  getDatabaseSync: (databaseName?: string) => ElStorageObject | string;
  deleteDatabase: (databaseName: string) => Promise<ElStorageLog>;
  deleteDatabaseSync: (databaseName: string) => ElStorageLog;
  listDatabases: <T>(folderPath: string | 'default') => Promise<T[]>;
  listDatabasesSync: <T>(folderPath: string | 'default') => T[];
  clearDatabase: (databaseName: string) => Promise<ElStorageLog | void>;
  clearDatabaseSync: (databaseName: string) => ElStorageLog | void;

  // Data CRUD Functions
  writeValue: (key: string, value: unknown, _pathToObject?: string) => Promise<ElStorageLog>;
  writeValueSync: (key: string, value: unknown, pathToObject?: string) => ElStorageLog;
  updateValue: (key: string, value: unknown) => Promise<ElStorageLog>;
  updateValueSync: (key: string, value: unknown) => ElStorageLog;
  deleteValue: (key: string) => Promise<ElStorageLog>;
  deleteValueSync: (key: string) => ElStorageLog

  getValue: (path: string, key: string) => Promise<object | object[]>;
  getValueSync: (path: string, key: string) => object | object[]
  getValueByFilter: (
    path: string, callback: (key: string, value: unknown) => boolean
  ) => Promise<object[] | object>;
  getValueByFilterSync: (
    path: string, callback: (key: string, value: unknown) => boolean
  ) => object[] | object;
}

export default ElStorageInterface;
export type { ElStorageObject, ElStorageLog };
