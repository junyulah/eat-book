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
const widthGap = 160;
const heightUnit = 100;
const HEIGHT_EXPAND = 100;

const MAX_TEXT_NUM = 20;

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
            height: height + CIRCLE_RADIUS * 2 + GRAPH_PADDING_Y * 2 + HEIGHT_EXPAND
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
    let textX = node.x + CIRCLE_RADIUS * 2;
    let textY = node.y + CIRCLE_RADIUS / 2;

    return [
        svgn('circle', {
            cx: node.x,
            cy: node.y,
            r: CIRCLE_RADIUS
        }), svgn('text', {
            x: textX,
            y: textY,
            'font-size': '12px'
        }, displayText(node.data, textX))
    ];
};

let displayText = (text, x) => {
    text = text || '';
    let lines = spanText(text, MAX_TEXT_NUM);
    return lines.map((line) => {
        return svgn(`tspan x=${x} dy=15`, line);
    });
};

let spanText = (text, maxWordNumber) => {
    let lines = [];

    let curLine = '',
        curCount = 0;
    for (let i = 0; i < text.length; i++) {
        let letter = text[i];
        curLine += letter;
        if (/[\u4E00-\u9FFF]/.test(letter)) {
            curCount += 2;
        } else {
            curCount++;
        }
        if (curCount >= maxWordNumber) {
            if (!/\s/.test(curLine[curLine.length - 1]) && text[i + 1] && !/\s/.test(text[i + 1])) {
                curLine += '-';
            }
            lines.push(curLine);
            curLine = '';
            curCount = 0;
        }
    }
    if (curLine) {
        lines.push(curLine);
    }

    return lines;
};
