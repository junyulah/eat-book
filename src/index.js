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
    let type = data.progress.type;

    let endProgressHandle = () => {
        let nextProrgess = nextProcedureProgress(data.progress.type);
        if (nextProrgess) {
            // TODO
            update('progress', nextProrgess);
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
                update('progress', initProgressMap[targetType]);
            }
        }),

        ProcedureViewMap[type]({
            note: data,
            onEnd: endProgressHandle
        })
    ]);
});

const PROCEDURES = ['preface', 'sections', 'concepts', 'conclusions', 'proofs', 'applications'];

let nextProcedureProgress = (from) => {
    let index = PROCEDURES.findIndex((item) => item === from);
    if (index < PROCEDURES.length - 1) {
        let targetType = PROCEDURES[index + 1];
        return initProgressMap[targetType];
    }
};

let initProgressMap = {
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
