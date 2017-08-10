'use strict';

let {
    n,
    view
} = require('kabanery');

let {
    parse
} = require('plain-tree-compiler');

let TreeView = require('../view/treeView');

let TextEditor = require('../view/textEditor');

let TwoColumn = require('../view/two-column');

/**
 * section tree dsl
 */

module.exports = view(({
    note,
    onEnd,
    onchange
}) => {
    let tree = parse(note.sections.text);

    let sectionTreeView = TreeView({
        tree
    });

    return TwoColumn({
        left: TextEditor({
            text: note.sections.text,
            onchange: (text) => {
                note.sections.text = text;
                sectionTreeView.ctx.update('tree', parse(text));
                onchange && onchange(note);
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
            sectionTreeView
        ])
    });
});
