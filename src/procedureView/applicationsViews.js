'use strict';

let {
    view,
    n
} = require('kabanery');

module.exports = view(() => {
    return n('div', 'applications');
});
