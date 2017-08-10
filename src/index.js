'use strict';

/**
 * reading: book => note
 */

/**
 * procedure:
 *
 * 0 (preface) -> 1 (sections) -> 2 (concepts) -> 3 (conclusions) -> 4 (proofs) -> 5 (applications) -> 6 (experiments) -> 7 (questions)
 */
let {
    view,
    n
} = require('kabanery');

let Crumbs = require('./view/crumbs');

let PrefaceView = require('./procedureView/prefaceView');
let SectionsView = require('./procedureView/sectionsView');
let ConceptView = require('./procedureView/conceptsView');
let ConclusionsView = require('./procedureView/conclusionsView');
let ProofsView = require('./procedureView/proofsView');
let ApplicationsView = require('./procedureView/applicationsViews');

let ProcedureViewMap = {
    preface: PrefaceView,
    sections: SectionsView,
    concepts: ConceptView,
    conclusions: ConclusionsView,
    proofs: ProofsView,
    applications: ApplicationsView
};

module.exports = view((data, {
    update
}) => {
    let type = data.note.progress.type;

    let endProgressHandle = () => {
        let nextProrgess = nextProcedureProgress(data.note.progress.type);
        if (nextProrgess) {
            // TODO
            update('note.progress', nextProrgess);
            data.onchange && data.onchange(data.note);
        } else {
            // finished
        }
    };

    return n('div', {
        style: {
            height: '100%'
        }
    }, [
        Crumbs({
            list: PROCEDURES,
            index: PROCEDURES.findIndex((item) => item === type),
            onchange: (index) => {
                let targetType = PROCEDURES[index];
                update('note.progress', getInitProgressMap()[targetType]);

                data.onchange && data.onchange(data.note);
            }
        }),

        ProcedureViewMap[type]({
            note: data.note,
            onEnd: endProgressHandle,
            onchange: () => {
                data.onchange && data.onchange(data.note);
            }
        })
    ]);
});

const PROCEDURES = ['preface', 'sections', 'concepts', 'conclusions', 'proofs', 'applications'];

let nextProcedureProgress = (from) => {
    let index = PROCEDURES.findIndex((item) => item === from);
    if (index < PROCEDURES.length - 1) {
        let targetType = PROCEDURES[index + 1];
        return getInitProgressMap()[targetType];
    }
};

let getInitProgressMap = () => {
    return {
        preface: {
            type: 'preface',
            stepIndex: 0
        },
        sections: {
            type: 'sections'
        },
        concepts: {
            type: 'concepts'
        },
        conclusions: {
            type: 'conclusions'
        },
        proofs: {
            type: 'proofs'
        },
        applications: {
            type: 'applications'
        }
    };
};
