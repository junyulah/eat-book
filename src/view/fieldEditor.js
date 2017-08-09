'use strict';

let {
    view
} = require('kabanery');

let InputDialog = require('kabanery-modal/lib/inputDialog');

module.exports = view((data) => {
    return InputDialog({
        title: data.title,
        text: data.text,
        disappear: data.disappear,
        autoHide: false,
        sure: (upd, {
            text
        }) => {
            data.text = text;
            data.onsure && data.onsure(text);
        }
    });
});
