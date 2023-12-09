const { ApplicationError, NonexistentDatabaseError, ParameterTypeError } = require("./LocalStorageError");

class ElStorage {
    constructor(databaseName) {
        if (typeof databaseName !== 'string') throw new RangeError('databaseName must be a string!');
        this.databaseName = databaseName;

        this.getData()
    }

    /**
     * Creates a new database with the localStorage API
     * @param {string} database_name
     */
    async createDatabase(database_name) {
        let exists = this.databaseExists(database_name);
        try {
            if (!exists) {
                throw new LocalStorageError({
                    message: `Database ${database_name} exist!`,
                    error: 'Overwrite Attempt'
                })
            }

            let initialData = {
                name: database_name,
                data: {}
            }

            localStorage.setItem(database_name, JSON.stringify(initialData));

        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Sets your database
     * @param {string} databaseName
     */
    async setDatabase(databaseName) {
        if (typeof databaseName !== 'string') {
            throw new ParameterTypeError(``);
        }

        let exists = this.databaseExists(databaseName);
        if (!exists) {
            throw new NonexistentDatabaseError(databaseName);
        }

        console.log(`Moved database from ${this.databaseName} to ${databaseName}`);
        this.databaseName = databaseName;
    }

    async databaseExists(databaseName) {
        return new Promise((resolve, reject)=> {
            if(typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
            }
            let exists = JSON.parse(localStorage.getItem(databaseName));
            if(exists !== null) {
                console.log(`Database ${databaseName} exist!`);
                resolve(true);
            }
            else {
                console.log(`Database ${databaseName} does not exist!`);
                resolve(false);
            }
        })
    }

    async getDatabase(databaseName) {
        return new Promise(async (resolve, reject) => {
            if(typeof databaseName !== 'string') {
                reject(new ParameterTypeError(`databaseName must be a string, not a ${typeof databaseName}`));
                return;
            }
            try {
                let databaseData = JSON.parse(localStorage.getItem(databaseName));

                if(databaseData === null) {
                    reject(new NonexistentDatabaseError(databaseName));
                }
                resolve(databaseData);
            }
            catch(err) {
                reject(err);
            }
        })
    }

    /**
     * Returns existing data
     * @param {*} data_name
     * @returns
     */
    getData(dataName) {
        return new Promise((resolve, reject) => {
            // Validate dataName type
            if (typeof dataName !== "string") {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof dataName}`));
                return;
            }

            // Try fetching data from localStorage
            try {
                let data = JSON.parse(localStorage.getItem(dataName));
                if (data === null) {
                    // Handle non-existent data
                    reject(new LocalStorageError({
                        message: `Data does not exist!`,
                        error: `Nonexistent Data for ${dataName}`,
                    }));
                } else {
                    // Resolve with retrieved data
                    resolve(data);
                }
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
    async setData(dataName, data) {
        return new Promise(async (resolve, reject) => {
            let databaseData = await this.getDatabase(this.databaseName);
        })
        let db_data = {
            [this.db_name]: ''
        }
        if (typeof data_name !== 'string') throw new RangeError('data_name must be a string!');
        let exists = localStorage.setItem(data_name, data);
        if (exists) {
            console.log('Data exists and is overwritten!');
        }
    }

    /**
     * Deletes data from localStorage
     * @param {string} data_name
     */
    deleteData(data_name) {
        if (typeof data_name !== 'string') throw new RangeError('data_name must be a string!');

        return new Promise((resolve, reject) => {
            if(typeof dataName !== 'string') {
                reject(new ParameterTypeError(`dataName must be a string, not a ${typeof dataName}`))
            }
        })
    }

    clearEverything(data_name) {
        // Add admin functionality and stuff
        console.log(`You are not permitted to use this function!`);
    }
}

module.exports = ElStorage;
