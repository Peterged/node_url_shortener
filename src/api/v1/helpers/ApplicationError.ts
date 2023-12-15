abstract class ApplicationError extends Error implements ApplicationErrorInterface {
  level: ErrorLevels;

  public constructor(message: string, name: string, level: ErrorLevels) {
    super(message);
    this.name = name;
    this.level = level;
  }
}

export default ApplicationError;
