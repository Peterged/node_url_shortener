function validatePerson(target: any) {
  const Original = target;

  // Define a new constructor that performs validation
  function newConstructor(...args: any[]) {

    // Call the original constructor with validated arguments
    const instance = new Original(...args);
    return instance;
  }

  // Set the prototype of the new constructor to the original prototype
  newConstructor.prototype = Original.prototype;

  // Return the new constructor
  return newConstructor;
}

export default validatePerson;
