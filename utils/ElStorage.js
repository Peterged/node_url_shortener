const { ApplicationError, NonexistentDatabaseError, ParameterTypeError } = require("./LocalStorageError");
const path = require('path');

class ElStorage {
    constructor(databaseName) {
        if (typeof databaseName !== 'string') {
            throw new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`);
        }
        if (databaseName.length < 1) {
            console.warn('String length is below 1, cancelling initialization!');
            return;
        }

        try {
            let exists = await this.databaseExists(databaseName);
            if (!exists) {
                await this.createDatabase(databaseName);
            }

            this.databaseName = databaseName;

            this.databaseData = this._updateDatabaseVariable();
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * 
     * @returns 
     */
    async _updateDatabaseVariable() {
        return new Promise((resolve, reject) => {
            try {
                this.databaseData = this.getDatabase(this.databaseName);
                console.log(`Completed Database Update!`);
            }
            catch (err) {
                reject(err);
            }
        })
    }

    /**
     * Creates a new database with the localStorage API
     * @param {string} databaseName
     */
    async createDatabase(databaseName) {
        return new Promise((resolve, reject) => {
            try {
                // Checks an existing database with the name given
                let exists = await this.databaseExists(databaseName);
                if (!exists) {
                    reject(new LocalStorageError({
                        message: `Database ${databaseName} exist!`,
                        error: 'Database Overwrite Attempt'
                    }))
                    return;
                }
                // Sets up initial data to be given at the database
                let initialData = {
                    name: databaseName,
                    createdOn: new Date().toJSON(),
                    // updatedOn: new Date().toJSON(), // Optional
                    totalFolders: 0,
                    data: {}
                }

                // Sets a template for the new database
                await localStorage.setItem(databaseName, JSON.stringify(initialData));
            }
            catch (err) {
                reject(err);
            }

        })
    }

    /**
     * Sets your database
     * @param {string} databaseName
     */
    async setDatabase(databaseName) {
        return new Promise((resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName should be a string, not a ${typeof databaseName}`));
                return;
            }

            try {
                let exists = await this.databaseExists(databaseName);
                if (!exists) {
                    reject(new NonexistentDatabaseError(databaseName));
                }

                console.log(`Moved database from ${this.databaseName} to ${databaseName}`);
                this.databaseName = databaseName;
            }
            catch (err) {
                reject(err);
            }
        })
    }

    /**
     * Checks if a specific database exists
     * @param {string} databaseName 
     * @returns 
     */
    async databaseExists(databaseName) {
        return new Promise((resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
            }
            let exists = JSON.parse(localStorage.getItem(databaseName));
            if (exists !== null) {
                console.log(`Database ${databaseName} exist!`);
                resolve(true);
            }
            else {
                console.log(`Database ${databaseName} does not exist!`);
                resolve(false);
            }
        })
    }

    /**
     * Returns a database
     * @param {string} databaseName 
     * @returns 
     */
    async getDatabase(databaseName) {
        return new Promise(async (resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
                return;
            }

            try {
                let databaseData = JSON.parse(localStorage.getItem(databaseName));

                if (databaseData === null) {
                    reject(new NonexistentDatabaseError(databaseName));
                }
                resolve(databaseData);
            }
            catch (err) {
                reject(err);
            }
        })
    }

    /**
     * Returns existing data
     * @param {*} data_name
     * @returns
     */
    async __getData(dataName) {
        return new Promise((resolve, reject) => {
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
     * @param {string} data_name
     * @param {any} data
     */
    async _addData(dataName, data, pathName) {
        return new Promise(async (resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
            }

            let databaseData = await this.getDatabase(this.databaseName);
            // Need to add function to write data through path

        })



        let exists = localStorage.setItem(data_name, data);
        if (exists) {
            console.log('Data exists and is overwritten!');
        }
    }

    async __updateData(dataName, data) {
        return new Promise((resolve, reject) => {
            if (typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
                return;
            }

            let databaseData = await this.getDatabase(this.databaseName);


        })
    }

    /**
     * Deletes data from localStorage
     * @param {string} data_name
     */
    async deleteData(dataName) {
        return new Promise((resolve, reject) => {
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
     * @returns {object} `{message, data}`
     */
    async findObjectByPath(pathString, obj = {}) {
        return new Promise((resolve, reject) => {
            if (typeof dataName !== 'string') {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof dataName}`));
                return;
            }
            // Regex to validate the path string
            let pathRegex = new RegExp("^(?<directory>(?:[a-zA-Z0-9-+()\\[\\]\\{\\}%$#@!,\\.\\'&\\`~_\\-\\=;]+(?<!\\\/?)\\\\{1,2}|\\\/?[a-zA-Z0-9-+()\\[\\]\\{\\}%$#@!,\\.\\'&\\`~\\_\\-\\=;]+?)+)\\\/?(?<filename>[a-zA-Z0-9\\-\\_\\.]+)(?<extension>\\.[a-zA-Z0-9]+)?$", '');

            const isValidPath = pathRegex.test(pathString);

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

    async addObjectByPath(pathString, obj = {}) {
        return new Promise((resolve, reject) => {
            if (typeof dataName !== 'string') {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof dataName}`));
                return;
            }
            // Regex to validate the path string
            let pathRegex = new RegExp("^(?<directory>(?:[a-zA-Z0-9-+()\\[\\]\\{\\}%$#@!,\\.\\'&\\`~_\\-\\=;]+(?<!\\\/?)\\\\{1,2}|\\\/?[a-zA-Z0-9-+()\\[\\]\\{\\}%$#@!,\\.\\'&\\`~\\_\\-\\=;]+?)+)\\\/?(?<filename>[a-zA-Z0-9\\-\\_\\.]+)(?<extension>\\.[a-zA-Z0-9]+)?$", '');

            const isValidPath = pathRegex.test(pathString);

            if (!isValidPath) {
                reject(new Error(`Please provide a valid path. Path provided: ${pathString}`));
                return;
            }


            // Split the path to get the folders
            let pathParts = pathString.split(/[\/\\]/);

            // Pass obj into a temporary variable
            let dataObj = obj;

            for (const step of steps) {
                dataObj = dataObj[step];
                if (!dataObj[part]) {
                    dataObj[part] = {};
                }
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
     * 
     * @param {string} modelName 
     * @returns 
     */
    async createNewModel(modelName, modelPath) {
        return new Promise((resolve, reject) => {
            if (typeof dataName !== 'string') {
                reject(new ParameterTypeError(`modelName must be a string, not a ${typeof modelName}`));
                return;
            }

            resolve(new ElStorageModel(this.databaseName, modelName, modelPath, this.findObjectByPath))
        })
    }
}

class ElStorageModel {
    constructor(databaseName, modelName, modelPath, ...functions) {
        if (typeof databaseName !== 'string' || typeof modelName !== 'string') {
            throw new ParameterTypeError(`Both databaseName and modelName must be a string!`);
        }
        super({ functions });



        this.databaseName = databaseName;
        this.modelName = modelName;
    }

    async _addData(dataName, data, path) {
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

module.exports = ElStorage;
