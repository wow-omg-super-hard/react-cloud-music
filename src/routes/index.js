import { Redirect } from 'react-router-dom';
import Recommend from '@pages/recommend/Recommend';

export default [{
    path: '/',
    render: () => (<Redirect to="/recommend" />),
    exact: true,
    key: 'home'
}, {
    path: '/recommend',
    component: Recommend,
    exact: true,
    key: 'recommend'
}];
