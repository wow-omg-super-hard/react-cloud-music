/** store的状态更新器 **/
import { combineReducers } from 'redux';
import searchReducer from './reducers/search';

export default combineReducers({
    search: searchReducer
});