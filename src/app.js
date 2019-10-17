/**
  应用的入口文件
  工作如下
  1. 引用全局样式
  2. 创建store
  3. 使用react-redux连接redux
  4. 创建路由
  5. 引用支持ES6关键字polyfill库
**/

import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxAsync from '@middlewares/reduxAsync';
import createStore from '@store/createStore';
import routes from '@routes';

// 引入全局样式
import '@statics/common.css';

// 创建store
const store = createStore([ reduxAsync ]);

// 使用react-redux，让redux管理react的状态
// 提供Provider组件，基组件创建context保存store，子类直接获取store
// connect方法生成高阶组件用来绑定store的state变化事件，和用来浅比较state前后是否变化用来取决于组件是否更新

// 创建路由
const AppRouter = (
    <Provider store={ store }>
        <Router>
            { routes.map(({ path, component, render, exact, key }) => (
                <Route 
                    path={ path } 
                    component={ component } 
                    render={ render } 
                    exact={ exact } 
                    key={ key } />
              )) 
            }        
        </Router>
    </Provider>
);

render(
    <AppRouter />,
    document.querySelector('#wrapper')
);