'use strict';

let {
    view,
    n
} = require('kabanery');

let FieldEditor = require('../view/fieldEditor');

module.exports = view((data, {
    update
}) => {
    let progress = data.note.progress;

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
                        [`note.preface.${prefaceTitle}`, text],
                        ['note.progress.stepIndex', progress.stepIndex + 1]
                    ]);
                }
            }
        })
    ]);
});

const PREFACE_PROCEDURES = ['book-name', 'authors'];
