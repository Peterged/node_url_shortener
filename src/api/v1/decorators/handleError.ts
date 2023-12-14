import { logger } from '@/src/config/Logger';
import DatabaseError from '../helpers/DatabaseError';
import ElStorage from '../helpers/ElStorage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (target: any) => {
  const Original = target;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function newConstructor(...args: any[]) {
    let instance;
    try {
      instance = new Original(...args);
    } catch (err) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }
    return instance;
  }

  newConstructor.prototype = Original.prototype;
  return newConstructor;
};

export default handleError;
