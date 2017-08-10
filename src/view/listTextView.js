'use strict';

let {
    view
} = require('kabanery');

let TextEditor = require('./textEditor');
let {
    plainTreeTextToObjectTree
} = require('../util/plainTreeTextToObjectTree');

/**
 * key must be unique
 */
module.exports = view((data) => {
    let errMsg = null,
        list = [];

    let updateList = (text) => {
        try {
            list = parseToList(text, data.options);
            errMsg = null;
        } catch (err) {
            errMsg = err.toString();
        }
    };

    updateList(data.text);

    data.oninit && data.oninit({
        errMsg,
        list,
        text: data.text
    });

    return TextEditor({
        text: data.text,
        onchange: (text) => {
            data.text = text;
            updateList(text);

            data.onchange && data.onchange({
                errMsg,
                list,
                text: data.text
            });
        }
    });
});

let parseToList = (text, options = {
    delimiter: '-',
    maxDepth: 1
}) => {
    return plainTreeTextToObjectTree(text, options);
};
