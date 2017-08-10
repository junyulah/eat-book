'use strict';

let {
    view,
    n
} = require('kabanery');

module.exports = view(({
    list = [],
    errMsg,
    valueRender = id
}) => {
    return n('div', {
        style: {
            padding: 8
        }
    }, [
        errMsg ? n('div', errMsg) : n('div', list.map(({
            key,
            value
        }) => {
            return n('div', [
                n('div', {
                    style: {
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                }, key),

                n('div', {
                    style: {
                        marginLeft: 10,
                        wordWrap: 'break-word'
                    }
                }, valueRender(value))
            ]);
        }))
    ]);
});

let id = v => v;
