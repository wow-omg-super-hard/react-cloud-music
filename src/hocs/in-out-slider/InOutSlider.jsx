/**
 * 组件的出入场滑动动画
 
 实现：
    1. 定义入场前、入场时，出场时三种状态对应的样式
    2. 组件初始化是入场前状态
    3. 在componentDidMount中定义setTimeout()，里面将状态设置为入场时,同时监听transitionEnd事件，用来在出场状态后跳转到上一页
    4. 点击返回箭头，设置为出场状态，跳转上一页
 */ 

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './inOutSilder.css';

export default class InOutSilder extends Component {
    static propTypes = {
        backCom: PropTypes.element.isRequired // 回退组件
        onBack: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.$el = null;
        this.state = {
            effect: 0 // 动画效果; 0: 入场前  1: 入场时  2: 出场时
        };

        this.handleBack = this.handleBack.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    render() {
        const { children, backCom, history, location, match } = this.props;
        const { effect } = this.state;

        return (
            <div className={ classnames({
                [ style.inOutSliderWrapper ]: true,
                [ style.enhanceBefore ]: !effect,
                [ style.enhancing ]: effect == 1,
                [ style.appearancing ]: effect == 2
            }) } ref={ (el) => this.$el = el }>
                {/* 回退栏 */}
                <div className={ style.back }>
                    { cloneElement(backCom, { onBack: this.handleBack }) }
                </div>

                {/* 被包裹的组件 */}
                { children }
            </div>
        );
    },

    componentDidMount() {
        setTimeout(() => {
            // 更改动画状态为入场时
            this.setState({ effect: 1 });
        });

        // 绑定transitionEnd，当出场完成后返回到上一页
        this.$el.addEventListener('transitionEnd', this.handleTransitionEnd, false);
    }

    componentWillUnmount() {
        // js代码中引用的dom被删除了，但是浏览器的dom中没有被删除，所以需要解绑绑定的事件
        this.$el.removeEventListener('transitionEnd', this.handleTransitionEnd, false);
    }

    handleBack() {
        this.setState({ effect: 2 });
    }

    handleTransitionEnd() {
        const translateVal = this.$el.style.transform;

        // 当前动画出场时，跳转到其他页面
        if (/\d*?%/.test(translateVal)) {
            this.props.onBack();
        }
    }
}

