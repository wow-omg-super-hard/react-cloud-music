// 基于redux中间件的异步处理

// 中间件：在action传给reducer之前，通过方法处理action，这个方法就叫做中间件
// redux的中间件通过enhancer(增强器)实现，它规定了中间件可以引用增强器实现的新的store，下一个中间件，action，所以它是高阶函数
const async = ({ getState, dispatch }) => (next) => (action) => {
    // 默认redux的dispatch不支持action为函数，当前中间件的异步处理就是让action支持函数
    if (typeof action === 'function') {
        action(dispatch);
    }

    next(action);
};