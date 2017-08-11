/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(16);

/**
 * @readme-quick-run
 *
 * Using method n to construct dom node quickly.
 *
 * [readme-lang:zh]用方法n快速构造dom节点
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {n, mount} = kabanery;
 *
 * mount(n('div', {
 *   id: 'qu',
 *   style: {
 *      backgroundColor: 'red'
 *   }
 * }, [
 *      n('span class=go style="font-size:16px"')
 * ]), document.body);
 *
 * console.log(document.getElementById('qu').outerHTML); // print result
 */

/**
 * @readme-quick-run
 *
 * Basic way to construct a view.
 *
 * [readme-lang:zh]构造一个组件的简单方法
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {view, n, mount} = kabanery;
 *
 * let MyView = view((data) => {
 *      let {type} = data;
 *
 *      return n('div', {
 *         id: 'test1',
 *         style: {
 *            fontSize: 10
 *         }
 *      },[
 *          type === 2 && n('span', 'second'),
 *          type === 3 && n('div', 'third')
 *      ]);
 * });
 *
 * mount(MyView({type: 3}), document.body);
 *
 * console.log(document.getElementById('test1').outerHTML); // print result
 */

/**
 * @readme-quick-run
 *
 * Using update api to update a view.
 *
 * [readme-lang:zh]运用update api去更新一个view
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {view, n, mount} = kabanery;
 *
 * let MyView = view((data, {update}) => {
 *      return n('div', {
 *         id: 'a',
 *         style: {
 *            fontSize: 10
 *         },
 *         onclick: () => {
 *            update('show', !data.show);
 *         }
 *      }, [
 *          data.show && n('div', 'show text')
 *      ]);
 * });
 *
 * mount(MyView({show: false}), document.body);
 *
 * document.getElementById('a').click(); // simulate user action
 * console.log(document.getElementById('a').outerHTML); // print result
 */


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * basic types
 */

let truth = () => true;

let isUndefined = v => v === undefined;

let isNull = v => v === null;

let isFalsy = v => !v;

let likeArray = v => !!(v && typeof v === 'object' && typeof v.length === 'number' && v.length >= 0);

let isArray = v => Array.isArray(v);

let isString = v => typeof v === 'string';

let isObject = v => !!(v && typeof v === 'object');

let isFunction = v => typeof v === 'function';

let isNumber = v => typeof v === 'number' && !isNaN(v);

let isBool = v => typeof v === 'boolean';

let isNode = (o) => {
    return (
        typeof Node === 'object' ? o instanceof Node :
        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};

let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

let isRegExp = v => v instanceof RegExp;

let isReadableStream = (v) => isObject(v) && isFunction(v.on) && isFunction(v.pipe);

let isWritableStream = v => isObject(v) && isFunction(v.on) && isFunction(v.write);

/**
 * check type
 *
 * types = [typeFun]
 */
let funType = (fun, types = []) => {
    if (!isFunction(fun)) {
        throw new TypeError(typeErrorText(fun, 'function'));
    }

    if (!likeArray(types)) {
        throw new TypeError(typeErrorText(types, 'array'));
    }

    for (let i = 0; i < types.length; i++) {
        let typeFun = types[i];
        if (typeFun) {
            if (!isFunction(typeFun)) {
                throw new TypeError(typeErrorText(typeFun, 'function'));
            }
        }
    }

    return function() {
        // check type
        for (let i = 0; i < types.length; i++) {
            let typeFun = types[i];
            let arg = arguments[i];
            if (typeFun && !typeFun(arg)) {
                throw new TypeError(`Argument type error. Arguments order ${i}. Argument is ${arg}. function is ${fun}, args are ${arguments}.`);
            }
        }
        // result
        return fun.apply(this, arguments);
    };
};

let and = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }
    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (!typeFun(v)) {
                return false;
            }
        }
        return true;
    };
};

let or = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }

    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (typeFun(v)) {
                return true;
            }
        }
        return false;
    };
};

let not = (type) => {
    if (!isFunction(type)) {
        throw new TypeError('The argument of and must be function.');
    }
    return (v) => !type(v);
};

let any = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(typeErrorText(list, 'list'));
    }
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    for (let i = 0; i < list.length; i++) {
        if (!type(list[i])) {
            return false;
        }
    }
    return true;
};

let exist = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(typeErrorText(list, 'array'));
    }
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    for (let i = 0; i < list.length; i++) {
        if (type(list[i])) {
            return true;
        }
    }
    return false;
};

let mapType = (map) => {
    if (!isObject(map)) {
        throw new TypeError(typeErrorText(map, 'obj'));
    }

    for (let name in map) {
        let type = map[name];
        if (!isFunction(type)) {
            throw new TypeError(typeErrorText(type, 'function'));
        }
    }

    return (v) => {
        if (!isObject(v)) {
            return false;
        }

        for (let name in map) {
            let type = map[name];
            let attr = v[name];
            if (!type(attr)) {
                return false;
            }
        }

        return true;
    };
};

let listType = (type) => {
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    return (list) => any(list, type);
};

let typeErrorText = (v, expect) => {
    return `Expect ${expect} type, but got type ${typeof v}, and value is ${v}`;
};

module.exports = {
    isArray,
    likeArray,
    isString,
    isObject,
    isFunction,
    isNumber,
    isBool,
    isNode,
    isPromise,
    isNull,
    isUndefined,
    isFalsy,
    isRegExp,
    isReadableStream,
    isWritableStream,

    funType,
    any,
    exist,

    and,
    or,
    not,
    mapType,
    listType,
    truth
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject, funType, or, isString, isFalsy, likeArray
} = __webpack_require__(1);

let iterate = __webpack_require__(10);

let {
    map, reduce, find, findIndex, forEach, filter, any, exist, compact
} = __webpack_require__(17);

let contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;

let difference = (list1, list2, fopts) => {
    return reduce(list1, (prev, item) => {
        if (!contain(list2, item, fopts) &&
            !contain(prev, item, fopts)) {
            prev.push(item);
        }
        return prev;
    }, []);
};

let union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));

let mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));

let setValueKey = (obj, value, key) => {
    obj[key] = value;
    return obj;
};

let interset = (list1, list2, fopts) => {
    return reduce(list1, (prev, cur) => {
        if (contain(list2, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, []);
};

let deRepeat = (list, fopts, init = []) => {
    return reduce(list, (prev, cur) => {
        if (!contain(prev, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, init);
};

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let flat = (list) => {
    if (likeArray(list) && !isString(list)) {
        return reduce(list, (prev, item) => {
            prev = prev.concat(flat(item));
            return prev;
        }, []);
    } else {
        return [list];
    }
};

module.exports = {
    flat,
    contain,
    difference,
    union,
    interset,
    map,
    reduce,
    iterate,
    find,
    findIndex,
    deRepeat,
    forEach,
    filter,
    any,
    exist,
    get,
    delay,
    mergeMap,
    compact
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    reduce
} = __webpack_require__(2);
let {
    funType, isObject, or, isString, isFalsy
} = __webpack_require__(1);

let defineProperty = (obj, key, opts) => {
    if (Object.defineProperty) {
        Object.defineProperty(obj, key, opts);
    } else {
        obj[key] = opts.value;
    }
    return obj;
};

let hasOwnProperty = (obj, key) => {
    if (obj.hasOwnProperty) {
        return obj.hasOwnProperty(key);
    }
    for (var name in obj) {
        if (name === key) return true;
    }
    return false;
};

let toArray = (v = []) => Array.prototype.slice.call(v);

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let set = (sandbox, name = '', value) => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    let parent = sandbox;
    if (!isObject(parent)) return;
    if (!parts.length) return;
    for (let i = 0; i < parts.length - 1; i++) {
        let part = parts[i];
        parent = parent[part];
        // avoid exception
        if (!isObject(parent)) return null;
    }

    parent[parts[parts.length - 1]] = value;
    return true;
};

/**
 * provide property:
 *
 * 1. read props freely
 *
 * 2. change props by provide token
 */

let authProp = (token) => {
    let set = (obj, key, value) => {
        let temp = null;

        if (!hasOwnProperty(obj, key)) {
            defineProperty(obj, key, {
                enumerable: false,
                configurable: false,
                set: (value) => {
                    if (isObject(value)) {
                        if (value.token === token) {
                            // save
                            temp = value.value;
                        }
                    }
                },
                get: () => {
                    return temp;
                }
            });
        }

        setProp(obj, key, value);
    };

    let setProp = (obj, key, value) => {
        obj[key] = {
            token,
            value
        };
    };

    return {
        set
    };
};

let evalCode = (code) => {
    if (typeof code !== 'string') return code;
    return eval(`(function(){
    try {
        ${code}
    } catch(err) {
        console.log('Error happened, when eval code.');
        throw err;
    }
})()`);
};

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let runSequence = (list, params = [], context, stopV) => {
    if (!list.length) {
        return Promise.resolve();
    }
    let fun = list[0];
    let v = fun && fun.apply(context, params);
    if (stopV && v === stopV) {
        return Promise.resolve(stopV);
    }
    return Promise.resolve(v).then(() => {
        return runSequence(list.slice(1), params, context, stopV);
    });
};

module.exports = {
    defineProperty,
    hasOwnProperty,
    toArray,
    get,
    set,
    authProp,
    evalCode,
    delay,
    runSequence
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n,
    view
} = __webpack_require__(0);

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    map
} = __webpack_require__(2);
let {
    isObject, isNode
} = __webpack_require__(1);

let parseArgs = __webpack_require__(18);

const KABANERY_NODE = 'kabanery_node';

// TODO general proxy n way

let cn = (elementType) => {
    return (...args) => {
        let {
            tagName, attributes, childs
        } = parseArgs(args);

        if (isKabaneryNode(attributes)) {
            childs = [attributes];
            attributes = {};
        }

        // plugin
        runPlugins(attributes['plugin'], tagName, attributes, childs);

        let {
            attrMap, eventMap
        } = splitAttribues(attributes);

        return {
            tagName,
            attrMap,
            eventMap,
            elementType,
            type: KABANERY_NODE, childNodes: childs,
        };
    };
};

let isKabaneryNode = (v) => isObject(v) && v.type === KABANERY_NODE;

let bindPlugs = (typen, plugs = []) => (...args) => {
    let {
        tagName, attributes, childs
    } = parseArgs(args);

    let oriPlugs = attributes.plugin = attributes.plugin || [];
    attributes.plugin = oriPlugs.concat(plugs);

    let node = typen(tagName, attributes, childs);

    return node;
};

let runPlugins = (plugs = [], tagName, attributes, childExp) => {
    for (let i = 0; i < plugs.length; i++) {
        let plug = plugs[i];
        plug && plug(tagName, attributes, childExp);
    }
};

let splitAttribues = (attributes) => {
    let attrMap = {},
        eventMap = {};
    for (let name in attributes) {
        let item = attributes[name];
        if (name.indexOf('on') === 0) {
            eventMap[name.substring(2)] = item;
        } else if (name !== 'plugin') {
            attrMap[name] = item;
        }
    }
    return {
        attrMap,
        eventMap
    };
};

// TODO svg
let toHTML = (node) => {
    if (isNode(node)) {
        return node.outerHTML;
    } else if (isKabaneryNode(node)) {
        let {
            tagName, attrMap, childNodes
        } = node;
        let attrStr = map(attrMap, (value, key) => `${key}="${value}"`).join(' ');
        attrStr = attrStr ? ' ' + attrStr : '';
        return `<${tagName}${attrStr}>${map(childNodes, toHTML).join('')}</${tagName}>`;
    } else {
        return node + '';
    }
};

module.exports = {
    n: cn('html'),
    svgn: cn('svg'),
    cn,
    bindPlugs,
    isKabaneryNode,
    toHTML,
    parseArgs
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    createElement, createSvgElement
} = __webpack_require__(29);

let {
    bindEvents
} = __webpack_require__(7);

let {
    map
} = __webpack_require__(2);

let {
    isKabaneryNode
} = __webpack_require__(5);

let reduceNode = (node) => {
    if (isKabaneryNode(node)) {
        let tarNode = null;
        if (node.elementType === 'html') {
            tarNode = createElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        } else {
            tarNode = createSvgElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        }

        bindEvents(tarNode, node.eventMap);
        return tarNode;
    } else {
        return node;
    }
};

module.exports = reduceNode;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let EventMatrix = __webpack_require__(30);

let {
    listenEventType,
    attachDocument,
    dispatchEvent
} = EventMatrix();

let bindEvents = (node, eventMap) => {
    // hook event at node
    node.__eventMap = eventMap;

    for (let type in eventMap) {
        listenEventType(type);
    }
};

module.exports = {
    bindEvents,
    attachDocument,
    dispatchEvent
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view
} = __webpack_require__(0);

let TextEditor = __webpack_require__(13);
let {
    plainTreeTextToObjectTree
} = __webpack_require__(14);

/**
 * key must be unique
 */
module.exports = view((data) => {
    let errMsg = null,
        list = [];

    let updateList = (text) => {
        try {
            list = parseToList(text, data.options);
            errMsg = null;
        } catch (err) {
            errMsg = err.toString();
        }
    };

    updateList(data.text);

    data.oninit && data.oninit({
        errMsg,
        list,
        text: data.text
    });

    return TextEditor({
        text: data.text,
        onchange: (text) => {
            data.text = text;
            updateList(text);

            data.onchange && data.onchange({
                errMsg,
                list,
                text: data.text
            });
        }
    });
});

let parseToList = (text, options = {
    delimiter: '-',
    maxDepth: 1
}) => {
    return plainTreeTextToObjectTree(text, options);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, mapType
} = __webpack_require__(1);

/**
 *
 * preidcate: chose items to iterate
 * limit: when to stop iteration
 * transfer: transfer item
 * output
 */
let iterate = funType((domain = [], opts = {}) => {
    let {
        predicate, transfer, output, limit, def
    } = opts;

    opts.predicate = predicate || truthy;
    opts.transfer = transfer || id;
    opts.output = output || toList;
    if (limit === undefined) limit = domain && domain.length;
    limit = opts.limit = stopCondition(limit);

    let rets = def;
    let count = 0;

    if (likeArray(domain)) {
        for (let i = 0; i < domain.length; i++) {
            let itemRet = iterateItem(domain, i, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    } else if (isObject(domain)) {
        for (let name in domain) {
            let itemRet = iterateItem(domain, name, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    }

    return rets;
}, [
    or(isObject, isFunction, isFalsy),
    or(isUndefined, mapType({
        predicate: or(isFunction, isFalsy),
        transfer: or(isFunction, isFalsy),
        output: or(isFunction, isFalsy),
        limit: or(isUndefined, isNumber, isFunction)
    }))
]);

let iterateItem = (domain, name, count, rets, {
    predicate, transfer, output, limit
}) => {
    let item = domain[name];
    if (limit(rets, item, name, domain, count)) {
        // stop
        return {
            stop: true,
            count,
            rets
        };
    }

    if (predicate(item)) {
        rets = output(rets, transfer(item, name, domain, rets), name, domain);
        count++;
    }
    return {
        stop: false,
        count,
        rets
    };
};

let stopCondition = (limit) => {
    if (isUndefined(limit)) {
        return falsy;
    } else if (isNumber(limit)) {
        return (rets, item, name, domain, count) => count >= limit;
    } else {
        return limit;
    }
};

let toList = (prev, v) => {
    prev.push(v);
    return prev;
};

let truthy = () => true;

let falsy = () => false;

let id = v => v;

module.exports = iterate;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    attachDocument
} = __webpack_require__(7);

let {
    isNode
} = __webpack_require__(1);

let {
    flat, forEach
} = __webpack_require__(2);

let reduceNode = __webpack_require__(6);

/**
 * @param parentNode
 *      the dom node used hook node we rendered
 */
module.exports = (kabaneryRoots, parentNode) => {
    kabaneryRoots = flat(kabaneryRoots);

    forEach(kabaneryRoots, (item) => {
        item = reduceNode(item);
        if (isNode(item)) {
            parentNode.appendChild(item);
        }
    });

    // attach to document
    attachDocument(getDoc(parentNode));
};

let getDoc = (node) => {
    while (node.parentNode) {
        node = node.parentNode;
    }
    return node;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * a simple way to write down a tree with out indent or brackets
 *
 * node = {
 *    data: "",
 *    children: []
 * }
 */

const DEFAULT_DELIMITER_SYMBOL = '#';

let parse = (str, {
    delimiter = DEFAULT_DELIMITER_SYMBOL,
    maxDepth
} = {}) => {
    let lines = str.split('\n');

    let tokens = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        tokens.push(parseLine(line, i, delimiter, maxDepth));
    }

    let tree = newNode();
    let refer = tree;

    for (let i = 0; i < tokens.length; i++) {
        let {
            wellCount,
            lineNumber,
            line
        } = tokens[i];
        if (wellCount === 0) {
            addLine(refer, line);
        } else {
            // find the parent
            // create new node
            // add the new node to parent's children
            if (wellCount <= refer.depth + 1) {
                let node = newNode(wellCount);
                let ancestor = getAncestor(refer, wellCount - 1);
                addChild(ancestor, node);
                addLine(node, line);

                // change refer
                refer = node;
            } else {
                throw new Error(`Depth can only be increased step by step. Token info: line number is ${lineNumber}, line string is ${line}, delimiter length is ${wellCount}.`);
            }
        }
    }

    return tree;
};

let toJsonObject = (tree) => {
    return {
        data: tree.data,
        depth: tree.depth,
        children: tree.children.map((child) => toJsonObject(child))
    };
};

let getAncestor = (node, ancestorDepth) => {
    if (node.depth < ancestorDepth) return null;
    else if (node.depth === ancestorDepth) return node;
    else {
        return getAncestor(node.parent, ancestorDepth);
    }
};

let newNode = (depth = 0) => {
    return {
        data: null,
        children: [],
        depth,
        parent: null
    };
};

let addChild = (node1, node2) => {
    node1.children.push(node2);
    node2.parent = node1;
};

let addLine = (node, line) => {
    if (node.data === null) {
        node.data = line;
    } else {
        node.data += ('\n' + line);
    }
};

let parseLine = (rawLine, lineNumber, delimiter, maxDepth) => {
    let wellCount = 0;

    let line = rawLine;

    let trimedLine = line.trim();
    if (trimedLine[0] === delimiter) {
        line = trimedLine;
    }

    while (line[0] === delimiter) {
        wellCount++;
        line = line.substring(1);
    }

    if (typeof maxDepth === 'number') {
        if (wellCount > maxDepth) {
            throw new Error(`The delimiter length is over than the max depth. Delimiter length is ${wellCount}, max depth is ${maxDepth}. Line number is ${lineNumber}, line string is ${rawLine}`);
        }
    }

    return {
        line,
        rawLine,
        lineNumber,
        wellCount
    };
};

module.exports = {
    parse,
    toJsonObject
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    parse
} = __webpack_require__(12);

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
            value = lines.join('').trim();
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


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    mount
} = __webpack_require__(0);

let EatBookView = __webpack_require__(32);
let testData = __webpack_require__(47);

mount(EatBookView({
    note: testData,
    onchange: (note) => {
        console.log(JSON.stringify(note, null, 4));
    }
}), document.body);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n, svgn, bindPlugs, toHTML, parseArgs, isKabaneryNode, cn
} = __webpack_require__(5);

let plugs = __webpack_require__(20);

let view = __webpack_require__(23);

let mount = __webpack_require__(11);

let N = __webpack_require__(31);

let reduceNode = __webpack_require__(6);

let {dispatchEvent} = __webpack_require__(7);

module.exports = {
    n,
    isKabaneryNode,
    cn,
    N,
    svgn,
    view,
    plugs,
    bindPlugs,
    mount,
    toHTML,
    reduceNode,

    parseArgs,
    dispatchEvent
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let iterate = __webpack_require__(10);

let defauls = {
    eq: (v1, v2) => v1 === v2
};

let setDefault = (opts, defauls) => {
    for (let name in defauls) {
        opts[name] = opts[name] || defauls[name];
    }
};

let forEach = (list, handler) => iterate(list, {
    limit: (rets) => {
        if (rets === true) return true;
        return false;
    },
    transfer: handler,
    output: (prev, cur) => cur,
    def: false
});

let map = (list, handler, limit) => iterate(list, {
    transfer: handler,
    def: [],
    limit
});

let reduce = (list, handler, def, limit) => iterate(list, {
    output: handler,
    def,
    limit
});

let filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {
    handler && handler(cur, index, list) && prev.push(cur);
    return prev;
}, [], limit);

let find = (list, item, fopts) => {
    let index = findIndex(list, item, fopts);
    if (index === -1) return undefined;
    return list[index];
};

let any = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev && originLogic(curLogic);
}, true, falsyIt);

let exist = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev || originLogic(curLogic);
}, false, originLogic);

let findIndex = (list, item, fopts = {}) => {
    setDefault(fopts, defauls);

    let {
        eq
    } = fopts;
    let predicate = (v) => eq(item, v);
    let ret = iterate(list, {
        transfer: indexTransfer,
        limit: onlyOne,
        predicate,
        def: []
    });
    if (!ret.length) return -1;
    return ret[0];
};

let compact = (list) => reduce(list, (prev, cur) => {
    if (cur) prev.push(cur);
    return prev;
}, []);

let indexTransfer = (item, index) => index;

let onlyOne = (rets, item, name, domain, count) => count >= 1;

let falsyIt = v => !v;

let originLogic = v => !!v;

module.exports = {
    map,
    forEach,
    reduce,
    find,
    findIndex,
    filter,
    any,
    exist,
    compact
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let parseAttribute = __webpack_require__(19);

let {
    isString, isObject, isNode, likeArray, isNumber, isBool
} = __webpack_require__(1);

let parseArgs = (args) => {
    let tagName,
        attributes = {},
        childExp = [];

    let first = args.shift();

    let parts = splitTagNameAttribute(first);

    if (parts.length > 1) { // not only tagName
        tagName = parts[0];
        attributes = parts[1];
    } else {
        tagName = first;
    }

    tagName = tagName.toLowerCase().trim();

    let next = args.shift();

    let nextAttr = {};

    if (likeArray(next) ||
        isString(next) ||
        isNode(next) ||
        isNumber(next) ||
        isBool(next)) {
        childExp = next;
    } else if (isObject(next)) {
        nextAttr = next;
        childExp = args.shift() || [];
    }

    attributes = parseAttribute(attributes, nextAttr);

    let childs = parseChildExp(childExp);

    return {
        tagName,
        attributes,
        childs
    };
};

let splitTagNameAttribute = (str = '') => {
    let tagName = str.split(' ')[0];
    let attr = str.substring(tagName.length);
    attr = attr && attr.trim();
    if (attr) {
        return [tagName, attr];
    } else {
        return [tagName];
    }
};

let parseChildExp = (childExp) => {
    let ret = [];
    if (isNode(childExp)) {
        ret.push(childExp);
    } else if (likeArray(childExp)) {
        for (let i = 0; i < childExp.length; i++) {
            let child = childExp[i];
            ret = ret.concat(parseChildExp(child));
        }
    } else if (childExp) {
        ret.push(childExp);
    }
    return ret;
};

module.exports = parseArgs;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isString, isObject
} = __webpack_require__(1);

let {
    mergeMap
} = __webpack_require__(2);

const ITEM_REG = /([\w-]+)\s*=\s*(([\w-]+)|('.*?')|(".*?"))/;

// TODO better key=value grammer
// TODO refactor with grammerL: class grammer, id grammer, refer some popular grammer
let parseAttribute = (attributes, nextAttr) => {
    // key=value key=value
    // value='abc' value=true value=123 value="def"
    if (isString(attributes)) {
        let str = attributes.trim(),
            kvs = [];

        let stop = false;
        while (!stop) {
            let newstr = str.replace(ITEM_REG, (matchStr, $1, $2) => {
                kvs.push([$1, $2]);
                return '';
            }).trim();
            if (newstr === str) {
                stop = true;
            }
            str = newstr;
        }

        attributes = {};
        for (let i = 0; i < kvs.length; i++) {
            let [key, value] = kvs[i];
            if (value[0] === '\'' && value[value.length - 1] === '\'' ||
                value[0] === '"' && value[value.length - 1] === '"') {
                value = value.substring(1, value.length - 1);
            }
            attributes[key] = value;
        }
    }
    // merge
    attributes = mergeMap(attributes, nextAttr);

    if (attributes.style) {
        attributes.style = getStyleString(attributes.style);
    }

    // TODO presudo
    /*
    if (attributes.presudo) {
        for (let name in attributes.presudo) {
            attributes.presudo[name] = getStyleString(attributes.presudo[name]);
        }
    }
   */

    return attributes;
};

let getStyleString = (attr = '') => {
    if (isString(attr)) {
        return attr;
    }

    if (!isObject(attr)) {
        throw new TypeError(`Expect object for style object, but got ${attr}`);
    }
    let styles = [];
    for (let key in attr) {
        let value = attr[key];
        key = convertStyleKey(key);
        value = convertStyleValue(value, key);
        styles.push(`${key}: ${value}`);
    }
    return styles.join(';');
};

let convertStyleKey = (key) => {
    return key.replace(/[A-Z]/, (letter) => {
        return `-${letter.toLowerCase()}`;
    });
};

let convertStyleValue = (value, key) => {
    if (typeof value === 'number' && key !== 'z-index') {
        return value + 'px';
    }
    if (key === 'padding' || key === 'margin') {
        let parts = value.split(' ');
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (!isNaN(Number(part))) {
                parts[i] = part + 'px';
            }
        }

        value = parts.join(' ');
    }
    return value;
};

module.exports = parseAttribute;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let twowaybinding = __webpack_require__(21);
let eventError = __webpack_require__(22);

module.exports = {
    twowaybinding,
    eventError
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    get, set
} = __webpack_require__(3);

module.exports = (obj, path) => (tagName, attributes, childExp) => {
    let value = get(obj, path, '');
    if (tagName === 'input') {
        attributes.value = value;
    } else {
        childExp.unshift(value);
    }

    if (!attributes.oninput) {
        attributes.oninput = (e) => {
            set(obj, path, e.target.value);
        };
    }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (catcher) => (tagName, attributes) => {
    for (let name in attributes) {
        let item = attributes[name];
        if (name.indexOf('on') === 0) {
            if (typeof item === 'function') {
                attributes[name] = wrapEventHandler(item, catcher);
            }
        }
    }
};

let wrapEventHandler = (fun, catcher) => {
    return function () {
        try {
            let ret = fun.apply(this, arguments);
            ret = Promise.resolve(ret);
            ret.catch(catcher);
            return ret;
        } catch (err) {
            return catcher(err);
        }
    };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    set
} = __webpack_require__(3);

let {
    isObject, isFunction, likeArray
} = __webpack_require__(1);

let {
    forEach
} = __webpack_require__(2);

let replace = __webpack_require__(24);

let reduceNode = __webpack_require__(6);

let mount = __webpack_require__(11);

/**
 * render function: (data) => node
 */

// TODO observable for update, append

// class level
let View = (view, construct, {
    afterRender
} = {}) => {
    // TODO class level API
    // instance level
    let viewer = (obj, initor) => {
        // create context
        let ctx = createCtx({
            view, afterRender
        });

        return createView(ctx, obj, initor, construct);
    };

    let viewerOps = (viewer) => {
        viewer.create = (handler) => {
            let ctx = createCtx({
                view, afterRender
            });

            handler && handler(ctx);

            let inst = (obj, initor) => {
                return createView(ctx, obj, initor, construct);
            };

            inst.ctx = ctx;

            return inst;
        };

        // extend some context
        viewer.expand = (ctxMap = {}) => {
            let newViewer = (...args) => {
                let obj = args[0];
                args[0] = View.ext(obj, ctxMap);

                return viewer(...args);
            };

            viewerOps(newViewer);
            return newViewer;
        };
    };

    viewerOps(viewer);

    return viewer;
};

View.ext = (data, ctxMap = {}) => (ctx) => {
    for (let name in ctxMap) {
        ctx[name] = ctxMap[name];
    }
    if (isFunction(data)) {
        return data(ctx);
    }
    return data;
};

let createView = (ctx, obj, initor, construct) => {
    let data = ctx.initData(obj, ctx);
    // only run initor when construct view
    initor && initor(data, ctx);
    construct && construct(data, ctx);

    // render node
    return ctx.replaceView();
};

let createCtx = ({
    view, afterRender
}) => {
    let node = null,
        data = null,
        render = null;

    let update = (...args) => {
        if (!args.length) return replaceView();
        if (args.length === 1 && likeArray(args[0])) {
            let arg = args[0];
            forEach(arg, (item) => {
                set(data, item[0], item[1]);
            });
            return replaceView();
        } else {
            let [path, value] = args;

            // function is a special data
            if (isFunction(value)) {
                value = value(data);
            }

            set(data, path, value);
            return replaceView();
        }
    };

    let appendView = (itemView) => {
        if (node) {
            mount(itemView, node);
        }
    };

    let replaceView = () => {
        let newNode = getNewNode();
        newNode = reduceNode(newNode);

        // type check for newNode

        node = replace(node, newNode);

        afterRender && afterRender(ctx);

        if (node) node.ctx = ctx;
        return node;
    };

    let getNewNode = () => {
        if (!render) render = view;
        let ret = render(data, ctx);
        if (isFunction(ret)) {
            render = ret;
            return render(data, ctx);
        } else {
            return ret;
        }
    };

    let initData = (obj = {}) => {
        data = generateData(obj, ctx);
        return data;
    };

    let getNode = () => node;

    let getData = () => data;

    let getCtx = () => ctx;

    // TODO refator
    let transferCtx = (newNode) => {
        node = newNode;
        newNode.ctx = ctx;
    };

    let ctx = {
        update,
        getNode,
        getData,
        transferCtx,
        initData,
        replaceView,
        appendView,
        getCtx
    };

    return ctx;
};

let generateData = (obj, ctx) => {
    let data = null;
    // data generator
    if (isFunction(obj)) {
        data = obj(ctx);
    } else {
        data = obj;
    }

    // TODO need mount event
    if (!isObject(data)) {
        throw new TypeError(`Expect object, but got ${data}. Type is ${typeof data}`);
    }
    return data;
};

module.exports = View;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    toArray
} = __webpack_require__(3);

let {
    isNode
} = __webpack_require__(1);

let {
    forEach
} = __webpack_require__(2);

let applyAttibutes = __webpack_require__(25);

let replaceDirectly = (node, newNode) => {
    let parent = node.parentNode;
    if (parent) {
        // replace
        parent.replaceChild(newNode, node);
        return newNode;
    } else {
        return node;
    }
};

let removeOldNode = (oldNode) => {
    let parent = oldNode.parentNode;
    if (parent) {
        parent.removeChild(oldNode);
    }
};

// TODO using key
let diffNode = (node, newNode) => {
    if (!newNode) {
        return removeOldNode(node);
    }

    if (node.nodeType === 3 && newNode.nodeType === 3) {
        node.textContent = newNode.textContent;
    }

    if (isNode(node) && isNode(newNode)) {
        if (node.nodeType === 3 && newNode.nodeType === 3) {
            node.textContent = newNode.textContent;
            return node;
        }

        if (node.tagName !== newNode.tagName ||
            node.tagName === 'INPUT'
        ) {
            // TODO problems performance
            // TODO nodetype problem
            return replaceDirectly(node, newNode);
        } else {
            editNode(node, newNode);
        }
    }
    return node;
};

let editNode = (node, newNode) => {
    // attributes
    applyAttibutes(node, newNode);

    // transfer context
    if (newNode.ctx) {
        newNode.ctx.transferCtx(node);
    }

    // transfer event map
    if (newNode.__eventMap) {
        node.__eventMap = newNode.__eventMap;
    }

    let orinChildNodes = toArray(node.childNodes);
    let newChildNodes = toArray(newNode.childNodes);

    // TODO using key
    convertLists(orinChildNodes, newChildNodes, node);
};

let convertLists = (orinChildNodes, newChildNodes, parent) => {
    removeExtra(orinChildNodes, newChildNodes);

    // diff
    forEach(orinChildNodes, (orinChild, i) => {
        diffNode(orinChild, newChildNodes[i]);
    });

    appendMissing(orinChildNodes, newChildNodes, parent);
    return orinChildNodes;
};

let removeExtra = (orinChildNodes, newChildNodes) => {
    // remove
    for (let i = newChildNodes.length; i < orinChildNodes.length; i++) {
        removeOldNode(orinChildNodes[i]);
    }
};

let appendMissing = (orinChildNodes, newChildNodes, parent) => {
    // append
    for (let i = orinChildNodes.length; i < newChildNodes.length; i++) {
        let newChild = newChildNodes[i];
        parent.appendChild(newChild);
    }
};

module.exports = (node, newNode) => {
    let ret = null;

    if (!node) {
        ret = newNode;
    } else if (!newNode) {
        removeOldNode(node);
        ret = null;
    } else {
        ret = diffNode(node, newNode);
    }

    return ret;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    getAttributeMap
} = __webpack_require__(26);

let {
    hasOwnProperty
} = __webpack_require__(3);

let {
    forEach
} = __webpack_require__(2);

let applyAttibutes = (node, newNode) => {
    // attributes
    let orinAttrMap = getAttributeMap(node.attributes);
    let newAttrMap = getAttributeMap(newNode.attributes);

    // update and remove
    forEach(orinAttrMap, (orinValue, name) => {
        if (hasOwnProperty(newAttrMap, name)) {
            let newValue = newAttrMap[name];
            if (newValue !== orinValue) {
                node.setAttribute(name, newValue);
            }
        } else {
            node.removeAttribute(name);
        }
    });

    // append
    forEach(newAttrMap, (newAttr, name) => {
        if (!hasOwnProperty(orinAttrMap, name)) {
            node.setAttribute(name, newAttr);
        }
    });
};

module.exports = applyAttibutes;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let shadowFrame = __webpack_require__(27);

let startMomenter = __webpack_require__(28);

let getX = (elem) => {
    var x = 0;
    while (elem) {
        x = x + elem.offsetLeft;
        elem = elem.offsetParent;
    }
    return x;
};

let getY = (elem) => {
    var y = 0;
    while (elem) {
        y = y + elem.offsetTop;
        elem = elem.offsetParent;
    }
    return y;
};

let getClientX = (elem) => {
    return getX(elem) - window.scrollX;
};

let getClientY = (elem) => {
    return getY(elem) - window.scrollY;
};

let removeChilds = (node) => {
    while (node && node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

let once = (node, type, handler, useCapture) => {
    let fun = function(e) {
        let ret = handler.apply(this, [e]);
        node.removeEventListener(type, fun, useCapture);
        return ret;
    };

    node.addEventListener(type, fun, useCapture);
};

let getAttributeMap = (attributes = []) => {
    let map = {};
    for (let i = 0; i < attributes.length; i++) {
        let {
            name, value
        } = attributes[i];
        map[name] = value;
    }
    return map;
};

let getClasses = (clz = '') => {
    let ret = [];
    let items = clz.split(' ');
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item = item.trim();
        if (item) {
            ret.push(item);
        }
    }
    return ret;
};

module.exports = {
    getX,
    getY,
    getClientX,
    getClientY,
    removeChilds,
    once,
    shadowFrame,
    getAttributeMap,
    startMomenter,
    getClasses
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let shadowFrame = () => {
    let div = document.createElement('div');
    let sr = div.createShadowRoot();
    sr.innerHTML = '<div id="shadow-page"></div>';

    let frame = null;

    let create = () => {
        let html = document.getElementsByTagName('html')[0];
        html.appendChild(div);

        return sr.getElementById('shadow-page');
    };

    let start = () => {
        if (frame) {
            return frame;
        }
        frame = new Promise(resolve => {
            if (document.body) {
                resolve(create());
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    resolve(create());
                });
            }
        });
        return frame;
    };

    let close = () => {
        frame.then(() => {
            let parent = div.parentNode;
            parent && parent.removeChild(div);
        });
    };

    return {
        start,
        close,
        sr,
        rootDiv: div
    };
};

module.exports = shadowFrame;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let isDomReady = (doc) => doc.readyState === 'complete' ||
    (!doc.attachEvent && doc.readyState === 'interactive');

let startMomenter = (doc = document) => {
    let loadedFlag = false;

    let resolves = [];

    let docReady = () => {
        let ready = () => {
            if (loadedFlag) return;
            loadedFlag = true;
            for (let i = 0; i < resolves.length; i++) {
                resolves[i]();
            }
            resolves = [];
        };
        if (doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', ready);
            doc.addEventListener('DOMContentLoaded', ready);
        } else {
            doc.attachEvent('onreadystatechange', () => {
                if (document.readyState === 'complete') {
                    ready();
                }
            });
        }
    };

    docReady();

    // generalWaitTime is used for async rendering
    return ({
        generalWaitTime = 0, startTimeout = 10000
    } = {}) => new Promise((resolve, reject) => {
        if (loadedFlag || isDomReady(doc)) { // already ready
            setTimeout(resolve, generalWaitTime);
        } else { // wait for ready
            resolves.push(resolve);
            setTimeout(() => {
                reject(new Error('timeout'));
            }, startTimeout);
        }
    });
};

module.exports = startMomenter;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isNode
} = __webpack_require__(1);

const svgNS = 'http://www.w3.org/2000/svg';

let applyNode = (node, attributes, childs) => {
    for (let name in attributes) {
        let attr = attributes[name];
        node.setAttribute(name, attr);
    }

    for (let i = 0; i < childs.length; i++) {
        let child = childs[i];
        if (isNode(child)) {
            node.appendChild(child);
        } else {
            node.textContent = child + '';
        }
    }
};

let createElement = (tagName, attributes, childs) => {
    let node = document.createElement(tagName);
    applyNode(node, attributes, childs);
    return node;
};

let createSvgElement = (tagName, attributes, childs) => {
    let node = document.createElementNS(svgNS, tagName);
    applyNode(node, attributes, childs);
    return node;
};

module.exports = {
    createElement,
    createSvgElement
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    contain
} = __webpack_require__(2);

module.exports = () => {
    let docs = [];
    let eventTypeMap = {};
    let handlerMap = {};

    let listenEventType = (type) => {
        if (!eventTypeMap[type]) {
            updateDocs(type);
        }
        eventTypeMap[type] = true;
    };

    /**
     * attach document used to accept events
     */
    let attachDocument = (doc = document) => {
        if (!contain(docs, doc)) {
            for (let type in eventTypeMap) {
                // prevent multiple version of kabanery to binding multiple times
                let id = getGlobalEventTypeId(type);
                if (!doc[id]) {
                    addEventListenerToDoc(doc, type);
                    doc[id] = true;
                }
            }
            docs.push(doc);
        }
    };

    let updateDocs = (type) => {
        if (!docs.length) {
            docs.push(document);
        }
        for (let i = 0; i < docs.length; i++) {
            let doc = docs[i];
            addEventListenerToDoc(doc, type);
        }
    };

    let addEventListenerToDoc = (doc, type) => {
        let handler = null;
        if (handlerMap[type]) {
            handler = handlerMap[type];
        } else {
            handler = listener(type);
            handlerMap[type] = handler;
        }
        doc.addEventListener(type, handler);
    };

    /**
     * e = {
     *  target,
     *  stopPropagation [optional]
     * }
     */
    let listener = (type) => function(e) {
        let ctx = this;
        let target = e.target;

        // hack the stopPropagration function
        let oldProp = e.stopPropagation;
        e.stopPropagation = function(...args) {
            e.__stopPropagation = true;
            return oldProp && oldProp.apply(this, args);
        };

        let nodePath = getNodePath(target);

        for (let i = 0; i < nodePath.length; i++) {
            let node = nodePath[i];
            applyNodeHandlers(e, type, node, ctx);
        }
    };

    let applyNodeHandlers = (e, type, node, ctx) => {
        if (e.__stopPropagation) { // event already been stoped by child node
            return true;
        }

        let handler = getHandler(type, node);
        return handler && handler.apply(ctx, [e]);
    };

    let getHandler = (type, target) => {
        let eventMap = target && target.__eventMap;
        return eventMap && eventMap[type];
    };

    let dispatchEvent = (type, e) => {
        let handler = handlerMap[type];
        handler && handler(e);
    };

    return {
        listenEventType,
        attachDocument,
        dispatchEvent
    };
};

/**
 * get the path of node
 */
let getNodePath = (target) => {
    let paths = [];
    while (target) {
        paths.push(target);
        target = target.parentNode;
    }
    return paths;
};

let getGlobalEventTypeId = (type) => `__event_type_id_${type}`;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n
} = __webpack_require__(5);

let {
    isArray, isFunction, isObject
} = __webpack_require__(1);

let {
    map
} = __webpack_require__(2);

module.exports = (...args) => {
    let tagName = args[0],
        attrs = {},
        childs = [];
    if (isArray(args[1])) {
        childs = args[1];
    } else if (isFunction(args[1])) {
        childs = [args[1]];
    } else {
        if (isObject(args[1])) {
            attrs = args[1];
            if (isArray(args[2])) {
                childs = args[2];
            } else if (isFunction(args[2])) {
                childs = [args[2]];
            }
        }
    }

    return (...params) => {
        let renderList = (list) => {
            return map(list, (viewer) => {
                if (isArray(viewer)) {
                    return renderList(viewer);
                } else if (isFunction(viewer)) {
                    return viewer(...params);
                } else {
                    return viewer;
                }
            });
        };

        return n(tagName, attrs, renderList(childs));
    };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * reading: book => note
 */

/**
 * procedure:
 *
 * 0 (preface) -> 1 (sections) -> 2 (concepts) -> 3 (conclusions) -> 4 (proofs) -> 5 (applications) -> 6 (experiments) -> 7 (questions)
 */
let {
    view,
    n
} = __webpack_require__(0);

let Crumbs = __webpack_require__(33);

let PrefaceView = __webpack_require__(34);
let SectionsView = __webpack_require__(38);
let ConceptView = __webpack_require__(43);
let ConclusionsView = __webpack_require__(44);
let ProofsView = __webpack_require__(45);
let ApplicationsView = __webpack_require__(46);

let ProcedureViewMap = {
    preface: PrefaceView,
    sections: SectionsView,
    concepts: ConceptView,
    conclusions: ConclusionsView,
    proofs: ProofsView,
    applications: ApplicationsView
};

module.exports = view((data, {
    update
}) => {
    let type = data.note.progress.type;

    let endProgressHandle = () => {
        let nextProrgess = nextProcedureProgress(data.note.progress.type);
        if (nextProrgess) {
            // TODO
            update('note.progress', nextProrgess);
            data.onchange && data.onchange(data.note);
        } else {
            // finished
        }
    };

    return n('div', {
        style: {
            height: '100%'
        }
    }, [
        Crumbs({
            list: PROCEDURES,
            index: PROCEDURES.findIndex((item) => item === type),
            onchange: (index) => {
                let targetType = PROCEDURES[index];
                update('note.progress', getInitProgressMap()[targetType]);

                data.onchange && data.onchange(data.note);
            }
        }),

        ProcedureViewMap[type]({
            note: data.note,
            onEnd: endProgressHandle,
            onchange: () => {
                data.onchange && data.onchange(data.note);
            }
        })
    ]);
});

const PROCEDURES = ['preface', 'sections', 'concepts', 'conclusions', 'proofs', 'applications'];

let nextProcedureProgress = (from) => {
    let index = PROCEDURES.findIndex((item) => item === from);
    if (index < PROCEDURES.length - 1) {
        let targetType = PROCEDURES[index + 1];
        return getInitProgressMap()[targetType];
    }
};

let getInitProgressMap = () => {
    return {
        preface: {
            type: 'preface',
            stepIndex: 0
        },
        sections: {
            type: 'sections'
        },
        concepts: {
            type: 'concepts'
        },
        conclusions: {
            type: 'conclusions'
        },
        proofs: {
            type: 'proofs'
        },
        applications: {
            type: 'applications'
        }
    };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

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


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

let FieldEditor = __webpack_require__(35);

module.exports = view((data, {
    update
}) => {
    let progress = data.note.progress;

    // write down some info
    progress.stepIndex = progress.stepIndex || 0;
    let prefaceTitle = PREFACE_PROCEDURES[progress.stepIndex];

    return n('div', [
        FieldEditor({
            title: prefaceTitle,
            text: data.note.preface[prefaceTitle] || '',
            onsure: (text) => {
                update([
                    [`note.preface.${prefaceTitle}`, text],
                    ['note.progress.stepIndex', progress.stepIndex + 1]
                ]);

                if (progress.stepIndex === PREFACE_PROCEDURES.length) { // last one
                    data.onEnd && data.onEnd();
                }

                data.onchange && data.onchange(data.note);
            }
        })
    ]);
});

const PREFACE_PROCEDURES = ['book-name', 'authors'];


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view
} = __webpack_require__(0);

let InputDialog = __webpack_require__(36);

module.exports = view((data) => {
    return InputDialog({
        title: data.title,
        text: data.text,
        disappear: data.disappear,
        autoHide: false,
        sure: (upd, {
            text
        }) => {
            data.text = text;
            data.onsure && data.onsure(text);
        }
    });
});


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let modal = __webpack_require__(37);

let {
    view, n
} = __webpack_require__(0);

/**
 * data = {
 *    title,
 *    text,
 *    disappear,
 *    sure
 * }
 */

module.exports = view((data, {
    update
}) => {
    return modal({
        disappear: data.disappear,
        content: [
            n('form', {
                onclick: (e) => {
                    e.preventDefault();
                }
            }, [
                n('h4', data.title || ''),
                n('input type=text', {
                    value: data.text || '',
                    onkeyup: (e) => {
                        data.text = e.target.value;
                    }
                }),
                n('br'),
                n('small', data.hint || ''),
                n('fieldset', [
                    n('button', {
                        onclick: () => {
                            data.sure && data.sure(update, data);
                        }
                    }, 'ok'),
                    n('button', {
                        style: {
                            marginLeft: 10
                        },
                        onclick: () => {
                            update('disappear', true);
                        }
                    }, 'cancel')
                ])
            ])
        ]
    });
});


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view, n
} = __webpack_require__(0);

/**
 * data = {
 *      content,
 *      disappear,
 *      autoHide
 * }
 */
module.exports = view((data, {
    update
}) => {
    if (data.autoHide === undefined) data.autoHide = true;
    if (data.disappear) return null;
    return n('div', {
        style: {
            backgroundColor: 'rgba(60, 60, 60, 0.4)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100000,
            width: '100%',
            height: '100%',
            textAlign: 'center',
            overflow: 'auto'
        },
        onclick: () => {
            if (data.autoHide) {
                update('disappear', true);
            }
        }
    }, [
        n('div', {
            style: {
                margin: '0 auto',
                display: 'inline-block',
                marginTop: 150,
                borderRadius: 4
            },
            onclick: (e) => {
                e.preventDefault();
                e.stopPropagation();
            }
        }, [data.content])
    ]);
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n,
    view
} = __webpack_require__(0);

let {
    parse
} = __webpack_require__(12);

let TreeView = __webpack_require__(39);

let TextEditor = __webpack_require__(13);

let TwoColumn = __webpack_require__(4);

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


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    n,
    svgn,
    view
} = __webpack_require__(0);

let {
    direction
} = __webpack_require__(40);

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
    let textY = node.y - CIRCLE_RADIUS;

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


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let direction = __webpack_require__(42);

module.exports = {
    direction
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (tree, {
    markCoord,
    getChildren,
    widthGap = 0, heightUnit = 0
}) => {
    let calculate = (node, left = 0, top = 0) => {
        let width = 0,
            height = 0;
        let y = top;
        //
        let childs = getChildren(node);

        if (!childs || !childs.length) {
            width = widthGap;
            height = 0;
        } else {
            let childHeight = 0;
            for (let i = 0; i < childs.length; i++) {
                let child = childs[i];
                let childSize = calculate(child, left + width, y + heightUnit);
                width += childSize.width;
                if (childSize.height > childHeight) {
                    childHeight = childSize.height;
                }
            }

            height = heightUnit + childHeight;
        }

        markCoord && markCoord(node, {
            x: left + width / 2,
            y
        });

        return {
            width, height
        };
    };

    return calculate(tree);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

let TwoColumn = __webpack_require__(4);
let ListTextView = __webpack_require__(8);
let KeyValueListView = __webpack_require__(9);

module.exports = view(({
    note,
    onEnd,
    onchange
}) => {
    let updateConceptList = (listData) => {
        keyValueListView.ctx.update([
            ['errMsg', listData.errMsg],
            ['list', listData.list]
        ]);
        onchange && onchange(note);
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


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

let TwoColumn = __webpack_require__(4);
let ListTextView = __webpack_require__(8);
let KeyValueListView = __webpack_require__(9);

module.exports = view(({
    note,
    onEnd,
    onchange
}) => {
    let updateConceptList = (listData) => {
        keyValueListView.ctx.update([
            ['errMsg', listData.errMsg],
            ['list', listData.list]
        ]);
        onchange && onchange(note);
    };

    let keyValueListView = KeyValueListView();

    let listTextView = ListTextView({
        text: note.conclusions.text,
        oninit: (listData) => {
            note.conclusions.text = listData.text;
            updateConceptList(listData);
        },
        onchange: (listData) => {
            note.conclusions.text = listData.text;
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


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

let TwoColumn = __webpack_require__(4);
let ListTextView = __webpack_require__(8);
let KeyValueListView = __webpack_require__(9);
let {
    plainTreeTextToObjectTree,
    objectTreeToMap,
    objectTreeToText
} = __webpack_require__(14);

const PROOF_TEXT_OPTIONS = {
    delimiter: '-',
    maxDepth: 2
};

module.exports = view(({
    note,
    onEnd,
    onchange
}) => {
    let updateConceptList = (listData) => {
        keyValueListView.ctx.update([
            ['errMsg', listData.errMsg],
            ['list', listData.list]
        ]);

        onchange && onchange(note);
    };

    let keyValueListView = KeyValueListView({
        valueRender: (value) => {
            let content = value[0].value;
            let proof = value[1].value;
            return [
                n('li', 'conclusion'),
                n('div', content),
                n('li', 'proof'),
                n('div', {
                    style: {
                        fontStyle: 'italic'
                    }
                }, proof)
            ];
        }
    });

    note.proofs.text = completeProofs(note.conclusions.text, note.proofs.text);

    let listTextView = ListTextView({
        text: note.proofs.text,
        oninit: (listData) => {
            note.proofs.text = listData.text;
            updateConceptList(listData);
        },
        onchange: (listData) => {
            note.proofs.text = listData.text;
            updateConceptList(listData);
        },
        options: PROOF_TEXT_OPTIONS
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

//
let completeProofs = (conclusionText, proofText) => {
    let conclusionList = plainTreeTextToObjectTree(conclusionText, {
        delimiter: '-',
        maxDepth: 1
    });

    let proofTextList = plainTreeTextToObjectTree(proofText, PROOF_TEXT_OPTIONS);

    // check grammer

    for (let i = 0; i < proofTextList.length; i++) {
        let item = proofTextList[i];
        // value, must be an array
        if (!Array.isArray(item.value) ||
            (item.value.length !== 2)
        ) {
            throw new Error(`the content of ${item.key} is not correct.`);
        }

        if (item.value[0].key !== 'content') {
            throw new Error(`misssing content subtitle for key ${item.key}, but got ${item.value[0].key}.`);
        }

        if (item.value[1].key !== 'proof') {
            throw new Error(`misssing proof subtitle for key ${item.key}, but got ${item.value[1].key}.`);
        }
    }

    // add missing conclusions to proofs
    let proofMap = objectTreeToMap(proofTextList);

    for (let i = 0; i < conclusionList.length; i++) {
        let conclusionItem = conclusionList[i];
        let key = conclusionItem.key;
        if (!proofMap[key]) {
            proofTextList.push({
                key,
                value: [

                    {
                        key: 'content',
                        value: conclusionItem.value
                    },
                    {
                        key: 'proof',
                        value: ''
                    }
                ]
            });
        }
    }

    return objectTreeToText(proofTextList, {
        delimiter: '-'
    });
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    view,
    n
} = __webpack_require__(0);

module.exports = view(() => {
    return n('div', 'applications');
});


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
    progress: {
        //type: 'proofs'
        //type: 'conclusions'
        type: 'sections'
    },
    preface: {
        'book-name': 'test-book'
    },
    sections: {
        text: '#a\n##Probabilistic analysis and further uses of indicator random variables \n##c\n#d'
    },
    concepts: {
        text: '- a\nwhatewfhwiufheiufhweifuheiufhewiufheiwufheiufheiufheriufhewoiruhfeiufheiwu!\n- b\nmake'
    },
    conclusions: {
        text: '- con1\neju!\n- con2\nmake'
    },
    proofs: {
        text: '- new\n--content\nsomething\n--proof\nwhat!'
    }
};


/***/ })
/******/ ]);