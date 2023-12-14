import { logger } from '@/src/config/Logger';
import DatabaseError from '../helpers/DatabaseError';
import ElStorage from '../helpers/ElStorage';

type DecoratedFunction<T> = (...args: unknown[]) => T | void;

const handleError = <T>(value: DecoratedFunction<T>, context: PropertyDescriptor)
  : typeof ElStorage => {
  const newContext = context;
  const originalMethod = context.value;
  newContext.value = (...args: unknown[]): ElStorage => {
    let result;
    try {
      result = originalMethod.apply(this, args);
    } catch (err) {
      if (err instanceof DatabaseError) {
        err.handleError();
      } else {
        logger.error(err);
      }
    }
    return result;
  };
  return newContext as typeof ElStorage;
};

export default handleError;
