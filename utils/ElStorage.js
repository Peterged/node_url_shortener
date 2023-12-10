const { ApplicationError, NonexistentDatabaseError, ParameterTypeError } = require("./LocalStorageError");
const path = require('path');
const { validatePath } = require("./Validation");

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./based');
}

class ElStorage {
    databaseData = {}
    databaseName;

    constructor(databaseName) {
        if (typeof databaseName !== 'string') {
            throw new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`);
        }
        if (databaseName.length < 1) {
            console.warn('String length is below 1, cancelling initialization!');
            return;
        }

        try {
            this.setDatabaseName(databaseName);
            (async () => {
                let currentData = await this.getDatabase();

                if (!await this.databaseExists(databaseName)) {
                    await this.createDatabase(databaseName);
                }

                this.setDatabaseData(currentData);

                console.log('ElStorage Initialized');
            })();
        } catch (err) {
            console.error(err);
        }
        this._updateDatabaseVariable();
    }

    setDatabaseName = (databaseName) => {
        if (typeof databaseName !== 'string') {
            throw new ParameterTypeError(`databaseName must be a string.`);
        }

        this.databaseName = databaseName;
    }

    setDatabaseData = (databaseData) => {
        if (typeof databaseData !== 'object') {
            throw new ParameterTypeError(`databaseData must be a string.`);
        }

        this.databaseData = databaseData;
    }

    getDatabaseName = () => {
        return this.databaseName || null;
    };

    getDatabaseData = () => {
        return this.databaseData || null;
    };

    /**
     * 
     * @returns 
     */
    _updateDatabaseVariable() {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(this.databaseData)
                this.databaseData = await this.getDatabase();
                console.log(`Completed Database Update!`);
                resolve(`Completed Database Update`)
            }
            catch (err) {
                reject(err);
            }
        })
    }

    /**
     * Creates a new database with the localStorage API
     * @param {string} databaseName
     * @return {{message: string, databaseName: string}}
     */
    createDatabase(databaseName) {
        return new Promise((resolve, reject) => {
            try {
                // Checks an existing database with the name given
                this.databaseExists(databaseName).then(exists => {
                    if (exists) {
                        // console.warn(`Database Overwrite Attempt!`)
                        // throw new Error({
                        //     message: `Database ${databaseName} exist!`,
                        //     error: 'Database Overwrite Attempt'
                        // })

                    }
                    else {
                        // Sets up initial data to be given at the database
                        let initialData = {
                            name: databaseName,
                            createdOn: new Date().toJSON(),
                            updatedOn: new Date().toJSON(), // Optional
                            totalKeys: 0,
                            data: {}
                        }

                        // Sets a template for the new database
                        localStorage.setItem(databaseName, JSON.stringify(initialData));
                        resolve({ message: 'Successfully created a new database!', databaseName })
                    }

                })
            }
            catch (err) {
                reject(err);
            }

        })
    }

    /**
     * Sets / Replaces your working database for the current class
     * 
     * @param {string} databaseName
     * @return {{message: string, status: string}}
     */
    setDatabase(databaseName) {
        return new Promise(async (resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName should be a string, not a ${typeof databaseName}`));
                return;
            }

            try {
                let exists = await this.databaseExists(databaseName);
                if (!exists) {
                    reject(new NonexistentDatabaseError(databaseName));
                }
                let message = `Moved database from ${this.databaseName} to ${databaseName}`;
                console.log(message);
                this.databaseName = databaseName;

                resolve({ message, status: 'Success' });
            }
            catch (err) {
                reject(err);
            }
        })
    }

    /**
     * Updates the database and the `updatedOn` property
     * 
     * @param {string} databaseData 
     * @returns {{message: string, data: object}}
     */
    updateDatabase(databaseData) {
        return new Promise(async (resolve, reject) => {
            if (typeof databaseData !== 'string') {
                reject(new ParameterTypeError(`databaseData must be a string, not a ${typeof databaseData}`));
                return;
            }
            databaseData['updatedOn'] = new Date().toJSON();
            this.databaseData = databaseData;
            resolve({ message: 'Successfully Updated Database!', data: databaseData });
        })
    }

    /**
     * Checks if a specific database exists
     * @param {string} databaseName 
     * @returns {bool}
     */
    databaseExists(databaseName) {
        return new Promise(async (resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
            }
            let exists = JSON.parse(localStorage.getItem(databaseName));
            if (exists !== null) {
                // console.log(`Database ${databaseName} exist!`);
                resolve(true);
            }
            else {
                // console.log(`Database ${databaseName} does not exist!`);
                resolve(false);
            }
        })
    }

    /**
     * Returns database data by getting it through its name
     * 
     * @param {string} [databaseName]
     * @returns {object} 
     */
    getDatabase = async (databaseName) => {
        return new Promise(async (resolve, reject) => {
            if (databaseName === undefined) {
                databaseName = this.getDatabaseName();
            }

            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not ${typeof databaseName}`));
                return;
            }

            try {
                let databaseData = await JSON.parse(localStorage.getItem(databaseName));

                if (databaseData === null) {
                    reject(new NonexistentDatabaseError(databaseName));
                    return;
                }
                resolve(databaseData);
            }
            catch (err) {
                reject(err);
            }
        })
    };

    async getAllKeys() {
        
        const keys = [];
        const queue = [this.getDatabaseData()];

        while (queue.length) {
            const currentObj = queue.shift();

            for (const key in currentObj) {
                if (typeof currentObj[key] === 'object' && !Array.isArray(currentObj[key])) {
                    queue.push(currentObj[key]);
                } else {
                    keys.push(key);
                }
            }
        }

        return keys;
    }


    /**
     * Returns existing data from the database
     * @param {string} dataName
     * @returns {object}
     */
    _getData(dataName) {
        return new Promise(async (resolve, reject) => {
            // Validate dataName type
            if (typeof dataName !== "string") {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof dataName}`));
                return;
            }

            // Try fetching data from localStorage
            try {
                let databaseData = JSON.parse(localStorage.getItem(dataName));


                if (databaseData === null) {
                    // Handle non-existent data
                    reject(new NonexistentDataError(`${dataName} data does not exist!`));
                    return;
                }
                // Resolve with retrieved data
                resolve(data);

            } catch (err) {
                // Handle any errors during parsing or retrieval
                reject(err);
            }
        });
    }

    /**
     * Sets and Overwrites data
     * @param {string} dataName
     * @param {any} data
     * @param {string} [pathName] 
     */
    store(dataName, dataString, pathName = "/") {
        return new Promise(async (resolve, reject) => {
            if (typeof dataName !== 'string') {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof databaseName}`));
            }


            // Need to add function to write data through path
            let result = await this.setPropertyByPath(pathName, dataName, dataString);
            resolve(result);
        })
    }

    _updateProperty(dataName, data) {
        return new Promise(async (resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
                return;
            }

            let databaseData = await this.getDatabase(this.databaseName);


        })
    }

    /**
     * Deletes data from localStorage
     * @param {string} dataName
     */
    deleteData(dataName) {
        return new Promise(async (resolve, reject) => {
            if (typeof dataName !== 'string') {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof dataName}`));
            }
            let data = await this.getData(dataName);
            if (data !== null) {
                reject(`data object ${dataName} exist!`);
                return;
            }

            // Return data
            let result = {
                message: `Successfully deleted data!`,
                deletedData: data
            }

            resolve(result);
        })
    }

    async clearEverything(dataName) {
        // Add admin functionality and stuff
        console.log(`You are not permitted to use this function!`);
    }

    /**
     * Finds a data in an object through path 
     * 
     * `E.g. path = images/icons`
     * @param {string} pathString
     * @param {object} obj 
     * @returns {{message: string, data: object}}
     */
    findPropertyByPath(pathString, obj = {}) {
        return new Promise((resolve, reject) => {
            if (typeof dataName !== 'string') {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof dataName}`));
                return;
            }

            // Path String Validation Process
            const isValidPath = validatePath(path);
            if (!isValidPath) {
                reject(new Error(`Please provide a valid path. Path provided: ${pathString}`));
                return;
            }


            // Split the path to get the folders
            steps = pathString.split(/[\/\\]/);

            // Pass obj into a temporary variable
            let dataObj = obj;

            for (const step of steps) {
                dataObj = dataObj[step];
                if (dataObj === null) {
                    break;
                }
            }
            if (dataObj !== null) {
                resolve({
                    message: 'Successfully retrieved data!',
                    data: dataObj
                })
            }
            // Return failure message if data is null
            resolve({
                message: 'Data cannot be found!',
                data: dataObj
            })
        })
    }

    /**
     * `Sets an object property data through path`
     * 
     * Can be used for Updating and Adding Data
     * @param {string} path 
     * @param {string} propertyName 
     * @param {string} propertyData
     * @param {object} [dataObject] - An Optional Parameter
     * @return {{message: string, data: object}}
     * 
     * @example
     * 
     *      setPropertyByPath('images', 'thumbnails', {createdOn: new Date().toJSON()})
     */
    setPropertyByPath = (path, propertyName, propertyData, dataObject = {}) => {

        if (JSON.stringify(dataObject) === '{}') {

            console.log(this.databaseData, "setPropertyByPath()");
        }

        return new Promise((resolve, reject) => {
            if (typeof propertyName !== 'string' || typeof path !== 'string') {
                reject(new ParameterTypeError(`path and propertyName must be a string.`));
                return;
            }

            // Path String Validation Process
            let isValidPath = validatePath(path);
            if (path === "/" && !isValidPath) isValidPath = true;
            if (!isValidPath) {
                reject(new Error(`Please provide a valid path. Path provided: ${pathString}`));
                return;
            }

            // Split the path to get the folders
            let pathParts = path.split(/[\/\\]/);

            // Pass obj into a temporary variable
            // console.log(this.databaseData, "setPropertyByPath()")

            let dataObj = dataObject;
            if (path !== '/') {
                dataObj 
                for (const step of steps) {
                    dataObj = dataObj[step];
                    if (!dataObj[part]) {
                        dataObj[part] = {};
                    }
                    if (dataObj === null) {
                        break;
                    }
                }
            }
            else {
                dataObj['data'][propertyName] = propertyData;
            }
            this.updateDatabase(dataObj);

            if (dataObj !== null) {
                resolve({
                    message: 'Successfully retrieved data!',
                    data: dataObj
                })
            }
            // Return failure message if data is null
            resolve({
                message: 'Data cannot be found!',
                data: dataObj
            })
        })
    }



    /**
     * 
     * @param {string} modelName 
     * @returns 
     */
    createNewModel(modelName, modelPath) {
        return new Promise(async (resolve, reject) => {
            if (typeof dataName !== 'string') {
                reject(new ParameterTypeError(`modelName must be a string, not a ${typeof modelName}`));
                return;
            }

            resolve(new ElStorageModel(this.databaseName, modelName, modelPath))
        })
    }
}

class ElStorageModel {
    constructor(databaseName, modelName, modelPath) {
        if (typeof databaseName !== 'string' || typeof modelName !== 'string') {
            throw new ParameterTypeError(`Both databaseName and modelName must be a string!`);
        }



        this.path = modelPath;
        this.databaseName = databaseName;
        this.modelName = modelName;
    }

    async store(dataName, data, path) {
        return new Promise(async (resolve, reject) => {
            let databaseData = await this.getDatabase(this.databaseName);


        })


        if (typeof data_name !== 'string') throw new RangeError('data_name must be a string!');
        let exists = localStorage.setItem(data_name, data);
        if (exists) {
            console.log('Data exists and is overwritten!');
        }
    }
}

// Pass in functions from ElStorage class to the ElStorageModel class
// To reduce code length
Object.assign(ElStorageModel.prototype, { setPropertyByPath: ElStorage.prototype.setPropertyByPath })
Object.assign(ElStorageModel.prototype, { findPropertyByPath: ElStorage.prototype.findPropertyByPath })
Object.assign(ElStorageModel.prototype, { getDatabase: ElStorage.prototype.getDatabase })

module.exports = ElStorage;
