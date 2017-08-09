'use strict';

let {
    n,
    view
} = require('kabanery');

module.exports = view(({
    left,
    right,
    leftWidthRate = 0.5,
    rightWidthRate = 0.5
}) => {
    return n('div', {
        style: {
            width: '100%',
            height: '100%'
        }
    }, [
        n('div', {
            style: {
                float: 'left',
                height: '100%',
                width: `${leftWidthRate * 100}%`,
                boxSizing: 'border-box'
            }
        }, [
            left
        ]),

        n('div', {
            style: {
                float: 'right',
                width: `${rightWidthRate * 100}%`,
                height: '100%',
                boxSizing: 'border-box'
            }
        }, [
            right
        ]),

        n('div style="clear:both"')
    ]);
});
