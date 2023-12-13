import { ElStorageInterface } from '@src/api/v1/interfaces/types'
import type { ElStorageLog, ElStorageObject } from '../interfaces/types/ElStorage';
import { DatabaseError } from './StorageErrors'
import { logger } from '@/src/config/Logger';


const initialData: ElStorageObject = {
    name: '',
    createdOn: '', // new Date().toJSON()
    updatedOn: '', // new Date().toJSON()
    totalKeys: 0,
    data: {}
}

class ElStorage implements ElStorageInterface {

    // Variables
    private databaseName: string = "";
    private databaseData: ElStorageObject = initialData;

    // Constructor
    private constructor(pathToFolder: string, databaseName: string, _data?: object) {
        try {
            this.databaseName = databaseName;
            this.databaseData = initialData;
        }
        catch (err) {
            console.error(err);
        }
    }

    protected async createDatabase(databaseName: string) {
        
            try {
                let databaseData = this.getDatabase();
            }
            catch(err: unknown) {
                if(err instanceof DatabaseError) {
                    err.handleError();
                }
            }
    }

    protected async updateDatabase(databaseData: string): Promise<Omit<ElStorageLog, "status">> {
        return new Promise((resolve, reject) => {

        })
    }

    protected async getDatabase(databaseName?: string = this.databaseName): Promise<ElStorageObject | string> {
        // Sets databaseName from class if undefined
        let databaseData: ElStorageObject | string = "";

        try {
            let storedData = localStorage.getItem(databaseName);
            databaseData = storedData ? JSON.parse(databaseData || "") : "";

            if (databaseData === null) {
                throw new DatabaseError(`Database ${databaseName} does not exist`, DatabaseErrorType.NON_EXISTENT_DATABASE, ErrorLevel.ERROR);
            }
        }
        catch (err: unknown) {
            if(err instanceof DatabaseError) {
                err.handleError();
            }
            logger.error(err);
        }

        return databaseData;
    }
}