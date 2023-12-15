import { logger } from '@/src/config/logger';
import DatabaseError from '../helpers/DatabaseError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = <T extends { new (...args: any[]): object }> (constructor: T) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function newConstructor(...args: unknown[]) {
    let instance;
    try {
      instance = new constructor(...args);
    } catch (err) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }
    return instance;
  }
};

export default handleError;
