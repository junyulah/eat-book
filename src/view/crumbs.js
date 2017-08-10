'use strict';

let {
    view,
    n
} = require('kabanery');

module.exports = view(({
    list = [],
    index,
    onchange
}) => {
    if (index === undefined || index === null) {
        index = list.length - 1;
    }

    return n('div', list.map((item, i) => {
        let itemStyle = {
            margin: '0 8'
        };
        if (i === index) {
            itemStyle.color = 'purple';
        }
        return [
            n('a', {
                style: itemStyle,
                onclick: () => {
                    onchange && onchange(i);
                }
            }, item),
            i < list.length - 1 && n('span', '>')
        ];
    }));
});
