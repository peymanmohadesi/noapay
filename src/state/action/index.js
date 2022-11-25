export const notification = (payload) => {
    return ({
        type: 'TRIGGER_NOTIFICATION',
        payload
    })
};

export const userInfo = (payload) => {
    return ({
        type: 'USER_INFO',
        payload
    })
};

export const test = (payload) => {
    return ({
        type: 'TEST',
        payload
    })
};