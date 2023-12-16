import { ElstorageInterface } from '@src/api/v1/interfaces/types';
import { LocalStorage as NodeLocalStorage } from 'node-localstorage';
import type {
  ElstorageLog,
  ElstorageObject,
} from '../interfaces/types/Elstorage';
import DatabaseError from './DatabaseError';
import logger from '@/src/config/logger';

// Decorators

const LocalStorage: NodeLocalStorage = new NodeLocalStorage('./based');
    

    
import handleError from '../decorators/handleError';
declare module 'elstorage' {
    import elstorage = require('elstorage');

    
    
    
    const initialData = {
        databaseName: '',
        createdOn: '', // new Date().toJSON()
        updatedOn: '', // new Date().toJSON()
        totalKeys: 0,
        data: {},
    } satisfies ElstorageObject;

    @handleError
    export class Schema implements ElstorageSchemaInterface {
        constructor<T = any>(definition: ):  {
            
        }
    }

    
    @handleError
    export class Elstorage<ElstorageInterface> {
        // Variables
        private databaseName: string = '';
        private databaseData: ElstorageObject = initialData;
        private _data: ElstorageObject | object = {};
    

    private message = {
        SUCCESS: 'Successfully completed process',
        FAILED: 'Something wrong happened',
      } as const;


      public constructor(databaseName: string, _data?: ElstorageObject | object) {
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

      public async createDatabase(
        databaseName: string,
      ): Promise<ElstorageLog | string> {
        let returnedData: ElstorageObject | string = '';
    
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
          returnedData = isObjectEmpty ? storedData : '';
        } catch (err: unknown) {
          if (err instanceof DatabaseError) {
            err.handleError();
          }
        }
    
        return {
            message: this.message.SUCCESS,
            data: returnedData
        };
      }
      

        /**
     * synchronize database data with a new one
     *
     * @param databaseData
     */
  public async updateDatabase(
    databaseData: ElstorageObject | object,
  ): Promise<ElstorageLog> {
    // const oldData = this.databaseData;
      if (typeof databaseData === 'object') {
        this.databaseData.data = databaseData;
      } else {
        this.databaseData = databaseData;
      }
    
    return { message: 'a' };
  }


  public updateDatabaseSync(
    databaseData: ElstorageObject | object,
  ): ElstorageLog {
    
      if (typeof databaseData === 'object') {
        this.databaseData.data = databaseData;
      } else {
        this.databaseData = databaseData;
      }
    

    return { message: this.message.SUCCESS, data: this.databaseData };
  }

  public async getDatabase(
    databaseName: string = this.databaseName,
  ): Promise<ElstorageLog | undefined> {
    // Sets databaseName from class if undefined

    let databaseData: ElstorageObject | undefined;

    
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
    

    return {
      message: this.message.SUCCESS,
      data: databaseData,
    };
  }



  public getValue(path: string, key: string) { }


  public getValueByFilter(
    path: string,
    callback: (key: string, value: unknown) => boolean,
  ): Promise<object[] | object> {
    const foundData: Array<unknown> = [];
    
  }

  public getDatabaseSync(
    databaseName: string = this.databaseName,
  ): ElstorageObject | string {
    let databaseData: ElstorageObject | string = '';

    
      const storedData = LocalStorage.getItem(databaseName) || undefined;
      databaseData = storedData ? JSON.parse(databaseData || '') : undefined;

      if (!databaseData) {
        throw new DatabaseError(
          `Database ${databaseName} does not exist`,
          DatabaseErrorType.NON_EXISTENT_DATABASE,
          ErrorLevel.ERROR,
        );
      }
    

    return databaseData;
  }



  public getValueByFilterSync(
    path: string,
    callback: (key: string, value: unknown) => boolean,
  ): object[] | object { 

  }

  public async writeValue(key: string, value: unknown, pathToObject: string = '/'): Promise<ElstorageLog> {

    
        const storedData = this.getValue(pathToObject, key);
    
    
    return {
        message: this.message.SUCCESS,
        data: {
            key: key,
            value: value
        }
    }
  }

  public writeValueSync(key: string, value: unknown, pathToObject: string = '/'): ElstorageLog {
    
        const storedData = this.
    
    
  }

  public async getValue(path: string, key: string): Promise<object | object[]> {
    try
  }

  public async updateValue(key: string, value: unknown): Promise<ElstorageLog> { }
  public updateValueSync(key: string, value: unknown): ElstorageLog {

  }

  public async deleteValue(key: string, pathToProperty: string): ElstorageLog {
    
  }

    }

    export class Blueprint<ElStorageInterface> {
        
    }

    class SchemaTypeOptions<T, EnforcePaperType = any> {
        type?:
        T extends string ? 
    }

    declare class NativeDate extends global.Date { }

    export type NumberBlueprintDefinition = typeof Number | 'number' | 'Number';
    export type StringBlueprintDefinition = typeof String | 'string' | 'String';
    export type BooleanBlueprintDefinition = typeof Boolean | 'boolean' | 'Boolean';
    export type DateBlueprintDefinition = typeof NativeDate | 'number' | 'Number';
    export type ObjectIdBlueprintDefinition = 'ObjectId' | 'ObjectID';

    
    
}
