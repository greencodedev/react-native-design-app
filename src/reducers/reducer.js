const reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BG_COLOR': 
            return [
                {
                    color: action.bgcolor
                }
            ]
        default:
            return state
    }
}

export default reducer;