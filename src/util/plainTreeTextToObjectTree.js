'use strict';

let {
    parse
} = require('plain-tree-compiler');

// TODO key orders

let plainTreeToObjectTree = (tree) => {
    let list = [];
    let map = {};

    for (let i = 0; i < tree.children.length; i++) {
        let item = tree.children[i];
        let itemData = item.data;
        let lines = itemData.split('\n');
        let key = lines.shift().trim();
        let value = null;
        if (item.children && item.children.length) {
            value = plainTreeToObjectTree(item);
        } else {
            value = lines.join('\n').trim();
        }

        if (map[key] !== undefined) {
            throw new Error(`repeated key ${key}.`);
        } else {
            map[key] = value;
            list.push({
                key,
                value
            });
        }
    }

    return list;
};

let objectTreeToMap = (list) => {
    if (Array.isArray(list)) {
        let map = {};
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            map[item.key] = objectTreeToMap(item.value);
        }
        return map;
    } else {
        return list;
    }
};

let plainTreeTextToObjectTree = (text, options) => {
    let tree = parse(text, options);
    return plainTreeToObjectTree(tree);
};

let objectTreeToText = (list, options = {}, depth = 0) => {
    if (Array.isArray(list)) {
        let itemTexts = [];
        for (let i = 0; i < list.length; i++) {
            let {
                key,
                value
            } = list[i];

            let itemText = `${repeatLetter(options.delimiter || '#', depth + 1)} ${key}\n\n${objectTreeToText(value, options, depth + 1)}`;
            itemTexts.push(itemText);
        }

        return itemTexts.join('\n\n');
    } else {
        return list;
    }
};

let repeatLetter = (letter, length) => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += letter;
    }
    return str;
};

module.exports = {
    plainTreeTextToObjectTree,
    plainTreeToObjectTree,
    objectTreeToMap,
    objectTreeToText
};
