'use strict';

let {
    view,
    n
} = require('kabanery');

let TwoColumn = require('../view/two-column');
let ListTextView = require('../view/listTextView');
let KeyValueListView = require('../view/keyValueListView');
let {
    plainTreeTextToObjectTree,
    objectTreeToMap,
    objectTreeToText
} = require('../util/plainTreeTextToObjectTree');

const PROOF_TEXT_OPTIONS = {
    delimiter: '-',
    maxDepth: 2
};

module.exports = view(({
    note,
    onEnd
}) => {
    let updateConceptList = (listData) => {
        keyValueListView.ctx.update([
            ['errMsg', listData.errMsg],
            ['list', listData.list]
        ]);
    };

    let keyValueListView = KeyValueListView();

    note.proofs.text = completeProofs(note.conclusions.text, note.proofs.text);

    let listTextView = ListTextView({
        text: note.proofs.text,
        oninit: (listData) => {
            note.proofs.text = listData.text;
            updateConceptList(listData);
        },
        onchange: (listData) => {
            note.proofs.text = listData.text;
            updateConceptList(listData);
        },
        options: PROOF_TEXT_OPTIONS
    });

    return n('div', {
        style: {
            width: '100%',
            height: '100%',
            marginTop: 10
        }
    }, [
        TwoColumn({
            left: listTextView,

            right: n('div', {
                style: {
                    height: '100%',
                    border: '1px solid #999999',
                    borderRadius: 5,
                    padding: 8,
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                }
            }, [
                n('button', {
                    onclick: () => {
                        onEnd && onEnd();
                    }
                }, 'finished'),

                keyValueListView
            ])
        })
    ]);
});

//
let completeProofs = (conclusionText, proofText) => {
    let conclusionList = plainTreeTextToObjectTree(conclusionText, {
        delimiter: '-',
        maxDepth: 1
    });

    let proofTextList = plainTreeTextToObjectTree(proofText, PROOF_TEXT_OPTIONS);

    // check grammer

    for (let i = 0; i < proofTextList.length; i++) {
        let item = proofTextList[i];
        // value, must be an array
        if (!Array.isArray(item.value) ||
            (item.value.length !== 2)
        ) {
            throw new Error(`the content of ${item.key} is not correct.`);
        }

        if (item.value[0].key !== 'content') {
            throw new Error(`misssing content subtitle for key ${item.key}, but got ${item.value[0].key}.`);
        }

        if (item.value[1].key !== 'proof') {
            throw new Error(`misssing proof subtitle for key ${item.key}, but got ${item.value[1].key}.`);
        }
    }

    // add missing conclusions to proofs
    let proofMap = objectTreeToMap(proofTextList);

    for (let i = 0; i < conclusionList.length; i++) {
        let conclusionItem = conclusionList[i];
        let key = conclusionItem.key;
        if (!proofMap[key]) {
            proofTextList.push({
                key,
                value: [

                    {
                        key: 'content',
                        value: conclusionItem.value
                    },
                    {
                        key: 'proof',
                        value: ''
                    }
                ]
            });
        }
    }

    return objectTreeToText(proofTextList);
};
