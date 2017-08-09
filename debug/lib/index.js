'use strict';

let {
    mount
} = require('kabanery');

let EatBookView = require('../../src');
let testData = require('./testData');

mount(EatBookView(testData), document.body);
