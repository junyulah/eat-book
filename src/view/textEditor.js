'use strict';

let {
    view,
    n
} = require('kabanery');

module.exports = view((data) => {
    return n('textarea', {
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
            data.text = e.target.value;
            data.onchange && data.onchange(data.text);
        }
    }, data.text);
});
