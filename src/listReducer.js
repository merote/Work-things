

const initialState = {
    checked1: -1,
    checked2: [0,0,0,0,0],
}

const listReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'EDIT_CHECKED1':
            return {...state,
                checked1: action.checked
            }
  
        case 'EDIT_CHECKED2':       
            return {...state,
                checked2: action.checked
            }

            default:
           return state
   }
}

export default listReducer