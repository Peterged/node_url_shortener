// module.exports = {
//     LocalStorageError:
//         class LocalStorageError extends Error {
//             constructor(message) {
//                 super(message);
//                 this.name = 'LocalStorageError'
//             }
//         }
// }

const ErrorSeverity = {
    CRITICAL: 'CRITICAL',
    WARNING: 'WARNING',
    INFO: 'INFO'
}

class ApplicationError extends Error {

    constructor(message, type, severity) {
        super(message);
        this.type = type;
        this.type = severity
    }

    handleError(error) {
        switch(error?.type) {


            case 'INVALID_PARAMETER':
                console.error({
                    Error: 'Invalid Parameter',
                    sourceMessage: error.message || undefined
                });
        }
    }
}

// DATABASE ERROR
// DATABASE ERROR
// DATABASE ERROR
// DATABASE ERROR
// DATABASE ERROR
// DATABASE ERROR

class DatabaseError extends ApplicationError {
    ErrorType = {
        // DATABASE RELATED
        nonexistent_database: 'NONEXISTENT_DATABASE',
        database_exists: 'DATABASE_EXISTS',

        // DATA RELATED
        nonexistent_data: 'NONEXISTENT_DATA'
    }

    handleDatabaseError(error) {
        if(error instanceof DatabaseError) {
            switch(error.type) {
                case 'NONEXISTENT_DATABASE':
                    console.error(`Error: ${error.message}`)
                    break;
            }
        }
        else {
            throw new ParameterTypeError(`Your error is not an instanceof DatabaseError class!`);
        }
    }
}
// DATABASE RELATED
class NonexistentDatabaseError extends DatabaseError {
    constructor(databaseName){
        super(`Database ${databaseName} does not exist!`, 'NONEXISTENT_DATABASE', ErrorSeverity.CRITICAL);
    }
}

// USER RELATED
class NonexistentDataError extends DatabaseError {
    constructor(dataName) {
        super(`${dataName} data does not exist!`, 'NONEXISTENT_DATA', ErrorSeverity.CRITICAL);
    }
}

// USER ERROR
// USER ERROR
// USER ERROR
// USER ERROR
// USER ERROR
// USER ERROR

class UserError extends ApplicationError {
    ErrorType = {
        invalid_parameter: 'INVALID_PARAMETER'
    }

    handleUserError(error) {
        switch(error.type) {
            case 'INVALID_PARAMETER':
                console.error(`Error: ${error.message}`);
                break;
        }
    }
}

class ParameterTypeError extends UserError {
    constructor(message) {
        super(message,  new UserError().ErrorType.invalid_parameter, ErrorSeverity.CRITICAL);
    }
}

// NETWORK ERROR
// NETWORK ERROR
// NETWORK ERROR
// NETWORK ERROR
// NETWORK ERROR
// NETWORK ERROR

class NetworkError extends ApplicationError {}







module.exports = { ApplicationError, NetworkError, NonexistentDatabaseError, NonexistentDataError, ParameterTypeError, ErrorSeverity }
