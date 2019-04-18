import {
    EDIT_CHECKED1,
    EDIT_CHECKED2
} from '../constants/ActionTypes'



const initialState = {
    checked1: -1,
    checked2: []
}

const listReducer = (state = initialState, action) => {
    switch(action.type) {
        case EDIT_CHECKED1:
            return {...state,
                checked1: action.checked
            }

/*        const copy = [...state]
            copy.checked1 = action.checked
            return copy
*/    
        case EDIT_CHECKED2:
            const copy = [...state]
            copy.checked2 = action.checked
            return copy
    }
    return state
}

export default listReducer