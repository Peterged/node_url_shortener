import { ElStorageInterface } from '@src/api/v1/interfaces/types'
import type { ElStorageLog, ElStorageObject } from '../interfaces/types/ElStorage';
import { DatabaseError } from './StorageErrors'
import { logger } from '@/src/config/Logger';
import { LocalStorage as NodeLocalStorage } from 'node-localstorage'
const LocalStorage: NodeLocalStorage = new NodeLocalStorage('./based');

// if (typeof localStorage === "undefined" || localStorage === null) {
//     LocalStorage = new NodeLocalStorage('./based');
// }

const initialData: ElStorageObject = {
    name: '',
    createdOn: '', // new Date().toJSON()
    updatedOn: '', // new Date().toJSON()
    totalKeys: 0,
    data: {}
}

export class ElStorage implements ElStorageInterface {

    // Variables
    private databaseName: string = "";
    private databaseData: ElStorageObject = initialData;
    private _data: ElStorageObject | object = {}

    // Constructor
    private constructor(databaseName: string, _data?: ElStorageObject | object) {
        try {
            const databaseData = this.getDatabaseSync(databaseName) || undefined;
            if(databaseData === null) {
                logger.info(`Database ${databaseName} not found! Creating a new database...`, { data: initialData });
            }
            
            this.databaseName = databaseName;
            this.databaseData = databaseData || initialData;

            if(_data) {
                this._data = _data;
            }
        }
        catch (err: unknown) {
            if(err instanceof DatabaseError) {
                err.handleError();
            }
            else {
                console.error(err);
            }
        }
    }

    // protected async createDatabase(databaseName: string) {
    //         try {
    //             const databaseData = this.getDatabase();
    //         }
    //         catch(err: unknown) {
    //             if(err instanceof DatabaseError) {
    //                 err.handleError();
    //             }
    //         }
    // }

    /**
     * synchronize database data with a new one
     * 
     * @param databaseData 
     */
    protected async updateDatabase(databaseData: ElStorageObject | object): Promise<ElStorageLog> {
        // const oldData = this.databaseData;
        try {
            if(typeof databaseData === 'object') {
                this.databaseData['data'] = databaseData;
            }
            else {
                this.databaseData = databaseData;
            }
        }
        catch(err: unknown) {
            if(err instanceof DatabaseError) {
                err.handleError();
            }
            else {
                logger.error(err);
            }
        }

        return {message: 'a'}
    }

    protected updateDatabaseSync(databaseData: ElStorageObject | object): ElStorageLog {
        try {
            if(typeof databaseData === 'object') {
                this.databaseData['data'] = databaseData;
            }
            else {
                this.databaseData = databaseData;
            }
        }
        catch(err: unknown) {
            if(err instanceof DatabaseError) {
                err.handleError();
            }
            else {
                logger.error(err);
            }
        }

        return ({message: ``, data: this.databaseData})
    }

    protected getDatabaseSync(databaseName: string = this.databaseName): ElStorageObject {
        let databaseData: ElStorageObject | string = "";
        
        try {
            const storedData = LocalStorage.getItem(databaseName);
            databaseData = storedData ? JSON.parse(databaseData || "") : undefined;

            if(databaseData === null) {
                throw new DatabaseError(`Database ${databaseName} does not exist`, DatabaseErrorType.NON_EXISTENT_DATABASE, ErrorLevel.ERROR);
            }
        }
        catch (err: unknown) {
            if(err instanceof DatabaseError) {
                err.handleError();
            }
            else {
                logger.error(err);
            }
        }

        return databaseData;
    }

    protected async getDatabase(databaseName: string = this.databaseName): Promise<ElStorageObject> {
        // Sets databaseName from class if undefined
        let databaseData: ElStorageObject | undefined = undefined;

        try {
            // Get Stored Item
            const storedData = LocalStorage.getItem(databaseName);
            databaseData = storedData ? JSON.parse(databaseData || "") : undefined;

            if (databaseData === undefined) {
                throw new DatabaseError(`Database ${databaseName} does not exist`, DatabaseErrorType.NON_EXISTENT_DATABASE, ErrorLevel.ERROR);
            }
        }
        catch (err: unknown) {
            if(err instanceof DatabaseError) {
                err.handleError();
            }
            else {
                logger.error(err);
            }
        }

        return databaseData;
    }
}