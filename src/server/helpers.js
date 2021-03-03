const moment = require('moment')
const helpers = {};

//Formatear la fecha
helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};


module.exports = helpers;