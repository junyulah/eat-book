'use strict';

let {
    view,
    n
} = require('kabanery');

let InputDialog = require('kabanery-modal/lib/inputDialog');

module.exports = view((data, {
    update
}) => {
    let {
        progress
    } = data;

    // write down some info
    progress.stepIndex = progress.stepIndex || 0;
    let prefaceTitle = PREFACE_PROCEDURES[progress.stepIndex];

    return n('div', [
        FieldEditor({
            title: prefaceTitle,
            text: '',
            onsure: (text) => {
                if (progress.stepIndex === PREFACE_PROCEDURES.length - 1) { // last one
                    data.onEnd && data.onEnd();
                } else {
                    update([
                        [`preface.${prefaceTitle}`, text],
                        ['progress.stepIndex', progress.stepIndex + 1]
                    ]);
                }
            }
        })
    ]);
});

let FieldEditor = (data) => {
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
};

const PREFACE_PROCEDURES = ['book-name', 'authors'];
