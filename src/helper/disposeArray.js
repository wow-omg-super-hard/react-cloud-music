/** 
  数组处理方法 
    插入
    删除
    更新
    查找
    去重
    扁平化
**/

// 数组去重
const uniq = (arr) => {
    let compare = {}, key;

    return arr.filter((val) => {
        key = typeof val + JSON.stringify(val);

        return compare.hasOwnProperty(key) ? false : (compare[ key ] = true);
    });
};

// 数组添加
const A = (dire) => (arr, val) => {
    // 如果dire小于0，从头插入
    // 如果dire大于0，从尾插入

    return uniq(dire < 0 ? [ val ].concat(arr) : arr.concat(val));
};
const HA = A(-1);
const TA = A(1);

// 数组查找
// 二分查找或者.findIndex
const BF = (arr, val) => {
    let min = 0,
        max = arr.length - 1,
        middle = Math.floor((min + max) / 2);

    while (min < max) {
        if (arr[ middle ] < val) {
            min = middle + 1;
        } else if (arr[ middle ] > val) {
            max = middle - 1;
        } else {
            return middle;
        }
    }

    return -1;
};
const F = (arr, findFn) => arr.findIndex(findFn);

// 数组删除
const D = (arr, val) => {
    const arrWait = [ ...arr ];
    const idx = F(arrWait, (value) => value === val);

    // 如果查找到了
    if (idx > -1) {
        arrWait.splice(idx, 1);
    }  

    return arrWait;
};

// 修改
const U = (arr, val, updated) => {
    const arrWait = [ ...arr ];
    const idx = F(arrWait, typeof val !== 'function' ? (value) => value === val : val);

    // 如果找到了
    if (idx > -1) {
        let item = arrWait[ idx ];

        // 如果原先的元素为纯对象并且替换的值也为纯对象，则合并对象，否则直接替换
        if ((typeof item === 'object' && Object.getPrototypeOf(item) === Object.prototype) &&
            (typeof updated === 'object' && Object.getPrototypeOf(updated) === Object.prototype)
        ) {
            arrWait[ idx ] = { ...item, ...updated  };
        } else {
            arrWait[ idx ] = updated;
        }
    }

    return arrWait;
}

// 扁平化
const flatten = (arr, single = false) => {
    const arrWait = [ ...arr ];

    // 当只需要扁平1层的时候
    if (single) {
        return Array.prototype.concat.apply([], arrWait);
    } else {
        while (arrWait.some((item) => Array.isArray(item))) {
            arrWait = Array.prototype.concat.apply([], arrWait);
        }
    }   

    return arrWait;
};

