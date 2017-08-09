'use strict';

let {
    view,
    n
} = require('kabanery');

let TwoColumn = require('../view/two-column');
let TextEditor = require('../view/textEditor');
let {
    parse
} = require('plain-tree-compiler');

module.exports = view(({
    note,
    onEnd
}) => {
    let conceptList = [];
    let errMsg = '';

    let updateConceptList = (text) => {
        try {
            conceptList = parseToConceptList(text);
            errMsg = '';
        } catch (err) {
            errMsg = err.toString();
        }
    };

    updateConceptList(note.concepts.text);

    let conceptListView = ConceptView({
        errMsg,
        conceptList
    });

    return n('div', {
        style: {
            width: '100%',
            height: '100%',
            marginTop: 10
        }
    }, [
        TwoColumn({
            left: TextEditor({
                text: note.concepts.text,
                onchange: (text) => {
                    note.concepts.text = text;
                    updateConceptList(text);
                    conceptListView.ctx.update([
                        ['conceptList', conceptList],
                        ['errMsg', errMsg]
                    ]);
                }
            }),

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

                conceptListView
            ])
        })
    ]);
});

let ConceptView = view(({
    conceptList,
    errMsg
}) => {
    return n('div', {
        style: {
            padding: 8
        }
    }, [
        errMsg ? n('div', errMsg) : n('div', conceptList.map(({
            conceptName,
            conceptBody
        }) => {
            return n('div', [
                n('div', {
                    style: {
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                }, conceptName),
                n('div', {
                    style: {
                        marginLeft: 10,
                        wordWrap: 'break-word'
                    }
                }, conceptBody)
            ]);
        }))
    ]);
});

let parseToConceptList = (text) => {
    let result = parse(text, {
        delimiter: '-',
        maxDepth: 1
    });

    let list = [];
    for (let i = 0; i < result.children.length; i++) {
        let item = result.children[i].data;
        let lines = item.split('\n');
        let conceptName = lines.shift().trim();
        let conceptBody = lines.join('').trim();
        list.push({
            conceptName,
            conceptBody
        });
    }

    return list;
};
