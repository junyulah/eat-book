'use strict';

let {
    view,
    n
} = require('kabanery');

let PrefaceView = require('./prefaceView');
let SectionsView = require('./sectionsView');

module.exports = view((data, {
    update
}) => {
    let type = data.progress.type;
    return n('div', {
        style: {
            height: '100%'
        }
    }, [
        n('div', type),

        type === 'preface' && PrefaceView({
            progress: data.progress,
            preface: data.preface,
            onEnd: () => {
                update('progress', nextProcedureProgress(data.progress.type));
            }
        }),

        type === 'sections' && SectionsView({
            progress: data.progress,
            sections: data.sections,
            onEnd: () => {
                update('progress', nextProcedureProgress(data.progress.type));
            }
        })
    ]);
});

const PROCEDURES = ['preface', 'sections'];

let nextProcedureProgress = (from) => {
    let index = PROCEDURES.findIndex((item) => item === from);
    if (index < PROCEDURES.length - 1) {
        let targetType = PROCEDURES[index + 1];
        switch (targetType) {
            case 'preface':
                return {
                    type: 'preface',
                    stepIndex: 0
                };
            case 'sections':
                return {
                    type: 'sections'
                };
        }
    }
};
