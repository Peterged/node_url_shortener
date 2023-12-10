const { ParameterTypeError } = require("./LocalStorageError");

/**
 * @param {string} stringText
 * @param {RegExp} regex - A RegExp Object
 * @returns {bool} isValid
 * 
 * @example
 * 
 *      validateRegex('12:56', /(?:\d{2})+/)
 */
module.exports.validateRegex = function validateRegex(stringText, regex = undefined) {
    if (typeof stringText !== 'string' || !(regex instanceof RegExp)) {
        throw new ParameterTypeError(`stringText must be a string and regex must be a RegExp Object!`);
    }

    let Reg = new RegExp(regex);
    const isValid = Reg.test(string);

    // If it doesn't match
    if (isValid) {
        return true;
    }
    return false;
}

/**
 * Validates a path string
 * @param {string} pathString 
 * @returns {bool}
 * 
 * @example
 * 
 *      validatePath('images/icons')
 */
module.exports.validatePath = function validatePath(pathString) {
    if (typeof pathString !== 'string') {
        throw new ParameterTypeError(`pathString must be a string!`);
    }
    let pathRegex = new RegExp("^(?<directory>(?:[a-zA-Z0-9-+()\\[\\]\\{\\}%$#@!,\\.\\'&\\`~_\\-\\=;]+(?<!\\\/?)\\\\{1,2}|\\\/?[a-zA-Z0-9-+()\\[\\]\\{\\}%$#@!,\\.\\'&\\`~\\_\\-\\=;]+?)+)\\\/?(?<filename>[a-zA-Z0-9\\-\\_\\.]+)(?<extension>\\.[a-zA-Z0-9]+)?$", '');

    const isValid = pathRegex.test(pathString);

    if (isValid) {
        return true;
    }
    return false;
}



/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @param {string} [o] - An optional string param
 * @param {string} [d=DefaultValue] - An optional string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

function foo(n, o, d) {
    return n
}


/**
 * Update file details.
 * PUT or PATCH files/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
*/
async function update({ params, request, response }) {

}