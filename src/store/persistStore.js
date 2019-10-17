/** 实现redux持久 **/

// 获取持久化存储
function get () {
    // 获取localStorage的version和当前打包的version
    const persistStoreVersion = JSON.parse(localStorage.getItem('persistStoreVersion'));

    // 如果小于当前打包的version，则证明state可能变化，就不用缓存，否则就用缓存
    if (persistStoreVersion == null || persistStoreVersion < process.env.VERSION) {
        return {};
    }

    return JSON.parse(localStorage.getItem('persistStore'));
}

// 设置持久化存储
function set (state, keys) {
    let stateAssigned;

    if (keys == null) {
        // 如果不存在要从state取的key，则拷贝全部state
        stateAssigned = { ...state };
    } else {
        stateAssigned = {};

        // 从state里部分取
        typeof keys === 'string' && (keys = [ keys ]);
        keys.forEach((key) => {
            stateAssigned[ key ] = state[ key ];
        });
    }

    // 将state和版本存入localStorage中
    localStorage.setItem('persistStore', JSON.stringify(stateAssigned));
    localStorage.setItem('persistStoreVersion', JSON.stringify(process.env.VERSION));
}

export {
    get,
    set
};