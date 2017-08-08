'use strict';

let {
    n,
    svgn,
    view
} = require('kabanery');

let {
    parse
} = require('plain-tree-compiler');

let {
    direction
} = require('tree-coordinate');

/**
 * section tree dsl
 */

module.exports = view((data) => {
    let tree = parse(data.sections.text);

    let sectionTreeView = SectionTreeView({
        tree
    });

    return n('div', {
        style: {
            height: '100%'
        }
    }, [
        n('div', {
            style: {
                float: 'left',
                height: '100%',
                width: '50%',
                boxSizing: 'border-box',
                padding: 8
            }
        }, [
            n('textarea', {
                style: {
                    width: '100%',
                    height: '100%',
                    outline: 'none',
                    resize: 'none',
                    overflow: 'auto',
                    boxSizing: 'border-box',
                    border: '1px solid #999999',
                    borderRadius: 5,
                    fontSize: 16,
                    padding: 5
                },
                oninput: (e) => {
                    let tree = parse(e.target.value);
                    data.tree = tree;
                    sectionTreeView.ctx.update('tree', tree);
                }
            }, data.sections.text)
        ]),

        n('div', {
            style: {
                float: 'right',
                width: '50%',
                height: '100%',
                boxSizing: 'border-box',
                padding: 8
            }
        }, [
            n('div', {
                style: {
                    width: '100%',
                    height: '100%',
                    border: '1px solid #999999',
                    borderRadius: 5,
                    backgroundColor: 'white'
                }
            }, [
                sectionTreeView
            ])
        ]),

        n('div style="clear:both"')
    ]);
});

const CIRCLE_RADIUS = 10;
const GRAPH_PADDING_X = 10;
const GRAPH_PADDING_Y = 10;

let SectionTreeView = view(({
    tree
}) => {
    if (!tree) return n('div', '');
    let {
        width,
        height
    } = direction(tree, {
        markCoord: (node, {
            x,
            y
        }) => {
            node.x = x + CIRCLE_RADIUS + GRAPH_PADDING_X;
            node.y = y + CIRCLE_RADIUS + GRAPH_PADDING_Y;
        },

        getChildren: (node) => {
            return node.children;
        },

        widthGap: 80,
        heightUnit: 50
    });

    return n('div', [
        svgn('svg', {
            x: 0,
            y: 0,
            width: width + CIRCLE_RADIUS * 2 + GRAPH_PADDING_X * 2,
            height: height + CIRCLE_RADIUS * 2 + GRAPH_PADDING_Y * 2
        }, [
            treeView(tree)
        ])
    ]);
});

let treeView = (tree) => {
    return [
        nodeView(tree),
        tree.children.map((child) => {
            return [
                svgn('line', {
                    x1: tree.x,
                    y1: tree.y,
                    x2: child.x,
                    y2: child.y,
                    strokeWidth: 2,
                    stroke: 'black'
                }),
                treeView(child)
            ];
        })
    ];
};

let nodeView = (node) => {
    return [
        svgn('circle', {
            cx: node.x,
            cy: node.y,
            r: CIRCLE_RADIUS
        }), svgn('text', {
            x: node.x + CIRCLE_RADIUS * 2,
            y: node.y + CIRCLE_RADIUS / 2
        }, node.data)
    ];
};
