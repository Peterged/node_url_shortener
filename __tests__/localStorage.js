const ElStorage = require('../utils/ElStorage');
const path = require('path');

console.log(path.join("data", 'images/icons'));
(async () => {

    let Test = await new ElStorage('test')
    // await Test._updateDatabaseVariable()

    console.log(await Test.store('icons', {}, '/'))
})()