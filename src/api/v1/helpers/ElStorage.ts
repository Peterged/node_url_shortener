import { ElStorageInterface } from '@src/api/v1/interfaces/types';
import { LocalStorage as NodeLocalStorage } from 'node-localstorage';
import type {
  ElStorageLog,
  ElStorageObject,
} from '../interfaces/types/ElStorage';
import DatabaseError from './DatabaseError';
import { logger } from '@/src/config/Logger.ts';

// Decorators
import handleError from '../decorators/handleError';
import validatePerson from '../decorators/testDecorator';

const LocalStorage: NodeLocalStorage = new NodeLocalStorage('./based');

// if (typeof localStorage === "undefined" || localStorage === null) {
//     LocalStorage = new NodeLocalStorage('./based');
// }

const initialData: ElStorageObject = {
  databaseName: '',
  createdOn: '', // new Date().toJSON()
  updatedOn: '', // new Date().toJSON()
  totalKeys: 0,
  data: {},
};

@validatePerson
class ElStorage implements ElStorageInterface {
  // Variables
  private databaseName: string = '';

  private databaseData: ElStorageObject = initialData;

  private _data: ElStorageObject | object = {};

  // Messages and Stuff
  private message = {
    SUCCESS: 'Successfully completed process',
    FAILED: 'Something wrong happened',
  } as const;

  // Constructor
  private constructor(databaseName: string, _data?: ElStorageObject | object) {
    try {
      const databaseData = this.getDatabaseSync(databaseName);
      if (!databaseData) {
        logger.info(
          `Database ${databaseName} not found! Creating a new database...`,
          { data: initialData },
        );
        this.createDatabase(databaseName);
      }

      this.databaseName = databaseName;
    //   this.databaseData = databaseData || initialData;

      if (_data) {
        this._data = _data;
      }
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        console.error(err);
      }
    }
  }

  protected async createDatabase(
    databaseName: string,
  ): Promise<ElStorageLog> {
    try {
      const storedData = this.getDatabaseSync(databaseName);
      const isObjectEmpty = !!Object.keys(storedData).length;
      if (!isObjectEmpty) {
        throw new DatabaseError(
          '',
          DatabaseErrorType.NON_EXISTENT_DATABASE,
          ErrorLevel.ERROR,
        );
      }
      const returnedData = isObjectEmpty ? storedData : '';
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      }
    }

    return returnedData;
  }

  protected createDatabaseSync(
    databaseName: string,
  ): ElStorageLog {
    let returnedData: ElStorageObject | undefined;

    try {
      const storedData = this.getDatabaseSync(databaseName);
      const isObjectEmpty = !!Object.keys(storedData).length;
      returnedData = isObjectEmpty ? storedData : '';
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }
    return {
      message: this.message.SUCCESS,
      data: returnedData,
    };
  }

  /**
     * synchronize database data with a new one
     *
     * @param databaseData
     */
  protected async updateDatabase(
    databaseData: ElStorageObject | object,
  ): Promise<ElStorageLog> {
    // const oldData = this.databaseData;
    try {
      if (typeof databaseData === 'object') {
        this.databaseData.data = databaseData;
      } else {
        this.databaseData = databaseData;
      }
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }

    return { message: 'a' };
  }

  protected updateDatabaseSync(
    databaseData: ElStorageObject | object,
  ): ElStorageLog {
    try {
      if (typeof databaseData === 'object') {
        this.databaseData.data = databaseData;
      } else {
        this.databaseData = databaseData;
      }
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }

    return { message: '', data: this.databaseData };
  }

  protected async getDatabase(
    databaseName: string = this.databaseName,
  ): Promise<ElStorageLog | undefined> {
    // Sets databaseName from class if undefined

    let databaseData: ElStorageObject | undefined;

    try {
      /** Get Stored Items */
      const storedData = LocalStorage.getItem(databaseName) || undefined;

      if (!storedData) {
        throw new DatabaseError(
          `Database ${databaseName} does not exist`,
          DatabaseErrorType.NON_EXISTENT_DATABASE,
          ErrorLevel.ERROR,
        );
      }

      // if() {
      // }

      /** Parse the data if it exists */
      databaseData = storedData ? JSON.parse(databaseData || '') : undefined;
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }

    return {
      message: this.message.SUCCESS,
      data: databaseData,
    };
  }

  protected getValue(path: string, key: string) { }

  protected getValueByFilter(
    path: string,
    callback: (key: string, value: unknown) => boolean,
  ): Promise<object[] | object> {
    const foundData: Array<unknown> = [];
    try {

    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }
  }

  //! SYNC FUNCTIONS
  protected getDatabaseSync(
    databaseName: string = this.databaseName,
  ): ElStorageObject | string {
    let databaseData: ElStorageObject | string = '';

    try {
      const storedData = LocalStorage.getItem(databaseName) || undefined;
      databaseData = storedData ? JSON.parse(databaseData || '') : undefined;

      if (!databaseData) {
        throw new DatabaseError(
          `Database ${databaseName} does not exist`,
          DatabaseErrorType.NON_EXISTENT_DATABASE,
          ErrorLevel.ERROR,
        );
      }
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }

    return databaseData;
  }

  protected getValueByFilterSync(
    path: string,
    callback: (key: string, value: unknown) => boolean,
  ): object[] | object { 

  }

  public async writeValue(key: string, value: unknown, pathToObject: string = '/'): Promise<ElStorageLog> {

    try {
        const storedData = this.getValue(pathToObject, key);
    }
    catch(err) {
        if(err instanceof DatabaseError) {
            err.handleError();
        }
        else {
            logger.error(err);
        }
    }

    return {
        message: this.message.SUCCESS,
        data: {
            key: key,
            value: value
        }
    }
  }

  public writeValueSync(key: string, value: unknown, pathToObject: string = '/'): ElStorageLog {
    try {
        const storedData = this.
    }
    catch(err) {
        if(err instanceof DatabaseError) {
            err.handleError();
        }
        else {
            logger.error(err);
        }
    }
  }

  public async getValue(path: string, key: string): Promise<object | object[]> {
    try
  }

  public async updateValue(key: string, value: unknown): Promise<ElStorageLog> { }
  public updateValueSync(key: string, value: unknown): ElStorageLog {

  }

  public async deleteValue(key: string, pathToProperty: string): ElStorageLog {
    try{

    }
    catch(err) {
        if(err instanceof DatabaseError) {
            err.handleError();
        }
        else {
            logger.error(err);
        }
    }
  }


}

export default ElStorage;
