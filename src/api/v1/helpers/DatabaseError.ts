import ApplicationError from './ApplicationError';
import logger from '@/src/config/logger';

// * DATABASE ERROR CLASS
class DatabaseError extends ApplicationError implements DatabaseErrorInterface {
  public constructor(message: string, name: DatabaseErrorTypes, level: ErrorLevels) {
    super(message, name, level);
  }

  handleError(): void {
    const messageLog = {
      message: this.message,
      data: { name: this.name, level: this.level },
    };

    switch (this.name) {
      case DatabaseErrorType.NON_EXISTENT_DATABASE:
        logger.error(messageLog.message, messageLog.data);
        break;

      case DatabaseErrorType.EXISTING_DATABASE:
        logger.warn(messageLog.message, messageLog.data);
        break;

      case DatabaseErrorType.INVALID_DATABASE_FORMAT:
        logger.error(messageLog.message, messageLog.data);
        break;

      case DatabaseErrorType.NON_EXISTENT_DATA:
        logger.error(messageLog.message, messageLog.data);
        break;

        //! Data Related
      case DatabaseErrorType.DUPLICATED_ENTRY:
        logger.error(messageLog.message, messageLog.data);
        break;

      default:
        logger.silly('DatabaseErrorType doesn\'t match you silly :v');
        break;
    }
  }
}
export default DatabaseError;
