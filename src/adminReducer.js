import {Lists_Load, Lists_Load_test} from './databaseLoad';
//import List1_Load from './databaseLoad';


/*const MainService = ["Räätälöity","Mini", "Keski", "Laaja"]
const Service = ["siivous", "tiskaus", "imurointi", "syöttäminen", "strippaaminen"]
let init = []
let init2= []
//let init3= []
const test = [[],[2],[0, 2, 4],[0,1,2,3,4]]
//const initialState1 = MainService.map((a,i) => init[i] = {name:a,id:i,list2_id:test[i]})
//const initialState2 = Service.map((a,i) => init2[i] = {name:a,id:i,data:[]})
//const initialState3 = { checked1: -1, checked2: [], data: [] }
*/

//const init = Lists_Load_test()
const init = Lists_Load()

const initialState1 = init[0]
const initialState2 = init[1]
const initialState3 = init[2]

console.log(initialState1)
console.log(initialState2)
console.log(initialState3)


//First list data (service level) and link to second list
export const adminReducer = (state = initialState1, action) => {
    switch(action.type) {
        case 'ADD_LIST1':
            return [...state,
                {name: action.name,
                id: state.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1,
                list2_id: []
                }]
                
        case 'EDIT_LIST1':              
            return state.map((item, index) => 
                index === action.index ?
                {...item, list2_id: action.list2_id} :
                item     
            )
        case 'REMOVE_ID':
            const temp = [...state]
            state.forEach((a, i) => {
                const temp_id = a.list2_id.filter(b => b !== action.id2)
                temp[i].list2_id = temp_id
            })
            return temp

        case 'DELETE_LIST1':       
            return state.filter(item =>
                item.id !== action.id)
          
        default:
            return state
   }
}

//Second list data (services) including extra information data of services
export const adminReducer2 = (state = initialState2, action) => {
    switch(action.type) {
        case 'ADD_LIST2':
            return [...state,
                {name: action.name,
                id: state.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1,
                data:[]
                 }]
        case 'ADD_DATA':
            //const data_temp = state[action.index].data.concat(action.data)
            //console.log(state[action.index)               
            const data_with_id = {...action.data,
                id: state[action.index].data.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1}                                                             
            //const data_temp = [...state[action.index].data, {...action.data,
            //                id: state[action.list_index].data.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1}]
            return state.map((item, i) =>
                i === action.index ?
                    { ...item, data: [...item.data, data_with_id] } : item
            )
        case 'DELETE_DATA':
            const new_data = [...state[action.list_index].data].filter(item => item.id !== action.id)
            return state.map((item, i) =>
                i === action.list_index ?
                    { ...item, data: new_data } : item)        
                   
        case 'DELETE_LIST2':       
            return state.filter(item =>
                item.id !== action.id)
                   
        default:
            return state
   }
}

export const customerReducer = (state = initialState3, action) => {
    switch(action.type) {
        case 'CHECK_LIST1':
            return { ...state, list1: action.list1_index }
                   
        case 'CHECK_LIST2':
            return { ...state, list2: action.list2_index }

        case 'SAVE_DATA':
   
            const temp = state.data.map((a,i) => 
                    i === action.list2_index 
                    ? action.data
                    : a    
            )
            return {...state, data: temp}

        default:
            return state
    }

}
