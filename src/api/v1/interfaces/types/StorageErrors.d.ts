declare const ErrorLevel = {
  CRITICAL: "CRITICAL",
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFO: "INFO",
} as const;


type _ErrorLevel =
    (typeof ErrorLevel)[keyof typeof ErrorLevel];

interface _ApplicationError {
    // Error Levels
  level: _ErrorLevel;
  // new(message: string, name: string, severity: _ErrorSeverity): any;
}

interface _DatabaseError extends ApplicationError {
  // constructor(message: string, name: DatabaseErrorNames, severity: _ErrorSeverity);
  handleError(): void;
}

// * Database Error Class

/**
 * Represents different types of errors that can occur during database operations.
 */
declare const DatabaseErrorType = {
  /**
   * Occurs when the specified database does not exist.
   */
  NON_EXISTENT_DATABASE: "NON_EXISTENT_DATABASE",

  /**
   * Occurs when attempting to overwrite an existing database.
   */
  EXISTING_DATABASE: "EXISTING_DATABASE",

  /**
   * Occurs when attempting to access non-existent data.
   */
  NON_EXISTENT_DATA: "NON_EXISTENT_DATA",

  // * Data related errors

  /**
   * Occurs when attempting to insert duplicate data.
   */
  DUPLICATED_ENTRY: "DUPLICATE_ENTRY",

  /**
   * Occurs when attempting to access a non-existent table.
   */
  TABLE_NOT_FOUND: "TABLE_NOT_FOUND",
} as const;

type DatabaseErrorNames =
  (typeof DatabaseErrorType)[keyof typeof DatabaseErrorType];
