/**
 * 数据加载组件
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './dataLoading.css';

export default class DataLoading extends Component {
    static propTypes = {
        loading: PropTypes.bool
    };
    static defaultProps = {
        loading: true
    };

    render() {
        const { children } = this.props;
        const { loading } = this.state;

        return loading
            ? (
                <div className={ style.dataLoading }>
                    <span className={ style.dataLoadingContent }>loading...</span>
                </div>  
            )
            : children
    }
}