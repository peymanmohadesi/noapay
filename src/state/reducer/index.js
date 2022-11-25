import { combineReducers } from 'redux';

function notification(store = null, action) {
    if (action.type === 'TRIGGER_NOTIFICATION') {
        return action.payload;
    } else {
        return store;
    }
}

function userInfo(store = null, action) {
    if (action.type === 'USER_INFO') {
        return action.payload;
    } else {
        return store;
    }
}

function Test(store = 'init', action) {
    if (action.type === 'TEST') {
        return action.payload;
    } else {
        return store;
    }
}


export default combineReducers({
    userInfo,
    notification,
    test: Test,
});