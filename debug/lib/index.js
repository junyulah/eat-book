'use strict';

let {
    mount
} = require('kabanery');

let EatBookView = require('../../src');
let testData = require('./testData');

mount(EatBookView({
    note: testData,
    onchange: (note) => {
        console.log(JSON.stringify(note, null, 4));
    }
}), document.body);
