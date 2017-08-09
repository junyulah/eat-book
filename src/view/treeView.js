'use strict';

let {
    n,
    svgn,
    view
} = require('kabanery');

let {
    direction
} = require('tree-coordinate');

const CIRCLE_RADIUS = 10;
const GRAPH_PADDING_X = 10;
const GRAPH_PADDING_Y = 10;
const widthGap = 120;
const heightUnit = 50;

module.exports = view(({
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

        widthGap,
        heightUnit
    });

    return n('div', {
        style: {
            overflow: 'scroll'
        }
    }, [
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
