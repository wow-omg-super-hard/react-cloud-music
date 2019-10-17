/**
 * 图片懒加载
   实现：
    1. 每个图片元素初始的时候使用占位图显示
    2. 监听window对象的滚动事件，使用图片元素.top(相对于document) - scrollTop <= 容器.top(相对于document) + 容器.height || 图片元素.top + 图片元素.height - scrollTop >= 容器.top(相对于document)公式来判断图片元素是否在容器的可视范围内
    3. 如果图片元素在容器的可视范围内，则遍历图片元素将其data-src赋予src
    4. 定义成员属性用来标识图片元素是否全部加载完，如果全部加载完，则阻止遍历所有图片元素提高性能
*/
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import style from './imageLazyload.css';

export default class imageLazyload extends Component {
    constructor(props) {
        super(props);

        this.hasScroll = true;
        this.$el = this.$elToDocumentTop = this.height = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    render() {
        return (
            <div className={ style.imageLazyloadWrapper } ref={(el) => { 
                this.$el = el; 
                this.$elToDocumentTop = this.getToDocumentTop(el);
                this.height = el.offsetHeight;
            }}>
                { this.props.children }
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);    
    }

    handleScroll() {
        if (!this.hasScroll) {
            return;
        }

        this.hasScroll = Children.toArray(this.props.children).every(($el) => {
            const $img = $el.tagName.toLowerCase() === 'img' 
                ? $el 
                : $el.querySelector('img');

            // 如果已经加载完成，就不加载
            if ($img.getAttribute('data-src') == null) {
                return true;
            }

            if (this.checkIsViewport($img, this.height, document.documentElement.scrollTop)) {
                $img.src = $img.getAttribute('data-src');
                $img.removeAttribute('data-src');
            }

            return false;
        });        
    }

    // 获取图片元素或容器距离document的距离
    getToDocumentTop($el) {
        while ($el && $el !== document.body) {
            $el = $el.parentElement;
        }

        return $el;
    }

    checkIsViewport($img, parentHeight, scrollTop) {
        const $imgToDocumentTop = this.getToDocumentTop($img);

        return $imgToDocumentTop - scrollTop <= this.$elToDocumentTop + parentHeight 
            || $imgToDocumentTop - scrollTop + $img.offsetHeight >= this.$elToDocumentTop;
    }
}