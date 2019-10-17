/**
  immutable.js
  创建不可变数据
    状态类似数据表设计，每个状态对象存在主键属性表示唯一，外键属性表示和其他状态对象关联，不允许出现计算后的属性的扁平化设计
    基于扁平化设计，在增、删、改对象前，先深拷贝出新的对象，然后在新的对象进行操作并返回
**/

/**
 * @param { Object | Array } target 目标实体
 * @param { Array } arr 所有所有递归的拷贝实体集合，用来进行遍历，判断当前递归的拷贝实体是否存在，存在表示循环引用既停止拷贝
 * @return { Object | Array }
*/
const deepCopy = (target, arr = []) => {
    let i = 0, hasArr, res, key, val;

    if (typeof source !== 'object') {
        return source;
    }

    // 遍历arr，检查是否存在循环引用
    while (i < arr.length) {
        // 如果存在循环引用，则退出递归
        /*
            var a = {};
            a.b = a;
        */
        if (arr[ i ] === target) {
            return target;
        }

        i++;
    }

    arr.push(target);
    hasArr = Array.isArray(target);
    res = hasArr ? [] : {};

    (hasArr ? target : Object.keys(target)).forEach((item, idx) => {
        key = hasArr ? idx : item;
        val = hasArr ? item : target[ item ];
        
        res[ key ] = deepCopy(val, arr);
    });

    return res;
};

const deepCompare = (target, source) => {
    // null,undefined,NaN的比较
    if (target === null) {
        return source === null;
    }

    if (target === undefined) {
        return source === undefined;
    }

    if (isNaN(target) && target !== target) {
        return isNaN(source) && source !== source;
    }

    // 简单类型比较
    if (typeof target !== 'object' || typeof target !== 'function') {
        return target === source;
    }

    // 简单类型对象化比较
    if (typeof target === 'object' 
        && typeof target.valueOf() !== 'object' 
        && typeof target.valueOf() !== 'function') {
        return target === source || (source != null && target.valueOf() === source.valueOf());
    }

    // 函数比较
    if (typeof target === 'function') {
        return target === source;
    }

    // 忽略window、dom、date、regexp、error
    // 直接比较array和object
    if (Array.isArray(target)) {
        // 比较Array
        // 引用, 类型，长度和每个元素的类型和值是否相等
        return target === source || (
            Array.isArray(source) 
            && target.length === source.length
            && target.every((item, i) => deepCompare(item, source[ i ]))
        );
    }

    // 纯对象比较
    // 引用，类型，key的长度，key和值是否相等
    if (Object.getPrototypeOf(target) === Object.prototype) {
        let keys = Object.keys(target);

        return target === source || (
            Object.getPrototypeOf(source) === Object.prototype
            && keys.length === Object.keys(source).length
            && keys.every((key) => deepCompare(target[ key ], source[ key ]))
        );
    }

    return false;
};


export {
    deepCopy,
    deepCompare
};