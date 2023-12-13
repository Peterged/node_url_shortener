import { logger } from '@src/config/Logger'

class ApplicationError extends Error implements _ApplicationError {
  level: _ErrorLevel;
  constructor(message: string, name: string, level: _ErrorLevel) {
    super(message);
    this.name = name;
    this.level = level;
  }

  // ["constructor"](message: string, type: string, level: _ErrorLevel) {
  //     throw new Error("Method not implemented.");
  // }
}

// * DATABASE ERROR CLASS
export class DatabaseError extends ApplicationError {
    constructor(message: string, name: DatabaseErrorNames, level: _ErrorLevel) {
        super(message, name, level);
    }
    
    handleError(): void {
        let messageLog = {
            message: this.message,
            data: { name: this.name, level: this.level }
        }

        switch(this.name) {
            case DatabaseErrorType.NON_EXISTENT_DATABASE:
                logger.error(messageLog.message, messageLog.data);
                break;

            case DatabaseErrorType.EXISTING_DATABASE:
                logger.warn(messageLog.message, messageLog.data);
                break;

            case DatabaseErrorType.NON_EXISTENT_DATA:
                logger.warn(messageLog.message, messageLog.data);
                break;
            
            //! Data Related
            case DatabaseErrorType.DUPLICATED_ENTRY:
                logger.warn(messageLog.message, messageLog.data);
                break;
            
            default: 
                logger.silly('DatabaseErrorType doesn\'t match you silly :v');
                break;
        }
    }
}
