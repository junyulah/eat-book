'use strict';

let {
    view,
    n
} = require('kabanery');

let TwoColumn = require('../view/two-column');
let ListTextView = require('../view/listTextView');
let KeyValueListView = require('../view/keyValueListView');

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

    let listTextView = ListTextView({
        text: note.concepts.text,
        oninit: (listData) => {
            note.concepts.text = listData.text;
            updateConceptList(listData);
        },
        onchange: (listData) => {
            note.concepts.text = listData.text;
            updateConceptList(listData);
        }
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
