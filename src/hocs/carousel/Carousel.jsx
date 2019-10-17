/**
 * 轮播图组件
     属于高阶组件
     设计的时候考虑
        1. 属性数据类型检测
        2. 设计成无状态组件
        3. 展示状态管理
    设计轮播步骤：
        1. 尾部增加一个子元素，便于当前位置是该子项时候
        2. 增加idx(当前滚动位置索引)、duration(过度持续时间: 轮播时候为设定时间，拖拽时为0)
        3. 当当前位置为最后一个子元素，设置translate left=0,duration=0，便于无缝连接

*/
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import style from './carousel.css';

export default class Carousel extends Component {
    static propTypes = {
        timeInterval: PropTypes.number, // 轮播的时间间隔
        autoplay: PropTypes.bool        // 是否自动轮播
    };

    static defaultProps = {
        timeInterval: 3000,
        autoplay: true
    };

    constructor(props) {
        super(props);

        this.state = {
            idx: 0,       // 序号
            duration: 300 // 过渡持续时间
        };
        // 固定值
        this.$el = null;    // 滑动的dom
        this.offset = 0;    // 每次滑动的距离
        this.timer = null;  // 定时器
    }

    render() {
        const { children } = this.props;
        const { duration, idx } = this.state;

        return (
            <div 
                className={ style.carouselWrapper } 
                ref={ (el) => { this.$el = el; this.offset = el.offsetWidth }}
                style={{ 
                    transitionDuration: `${ duration }ms`, 
                    transform: `translate3d(${ -idx * this.offset }px, 0, 0)` 
                }}>

                { children }

                {/* 复制一个便于无缝连接的最后子元素 */}
                { Children.toArray(children)[ Children.count(children) - 1 ] }

                {/* points */}
                { this.createPaginationPoints(Children.count(children)) }
            </div>
        );
    }  

    componentDidMount() {
        const { autoplay } = this.props;

        // 调用js animate库实现轮播动画
        autoplay && this.loopCarousel();
    } 

    // 轮播
    loopCarousel() {
        const { timeInterval, children } = this.props;
        const { idx } = this.state;
        const childCount = Children.count(children);

        this.timer = setInterval(() => {
            // 执行到最后，设置为第一个
            if (idx <= childCount) {
                this.setState({ idx: 0, duration: 0 });
            } else {
                this.setState({ idx: idx + 1, duration: 300 });
            }
        }, timeInterval);
    }

    // 创建底部分页按钮
    createPaginationPoints(count) {
        const { idx } = this.state;
        let points = [], i;

        for (i = 0; i < count; i++) {
            points.push(
                <span className={ idx === i ? 'active' : void 0 } />
            );    
        }

        return (
            <div className={ style.carouselPagination }>
                { points }
            </div>
        );
    }
}
