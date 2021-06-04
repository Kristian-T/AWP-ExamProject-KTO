function reducer(state = { topicState: 0 }, action) {
    switch (action.type) {
        case 'TECH': {

        }
        case 'MOVIES': {

        }
        case 'MUSIC': {

        }
        case 'BOOKS': {

        }
        default:
            return state
    }
}
module.exports = {
    discReducer: reducer
};
