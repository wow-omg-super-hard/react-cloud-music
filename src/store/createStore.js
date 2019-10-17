/** 创建store，内部实现观察者模式，管理应用的共享和持久状态 **/
import { createStore, applyMiddleware } from 'redux';
// 实现redux持久化
import { get as getPersistStore } from './persistStore';
// store的状态更新器
import reducer from './reducer';

export default (middlewares) => createStore(
    reducer, 
    getPersistStore(), 
    applyMiddleware(middlewares)
);