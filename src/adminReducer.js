
const MainService = ["Räätälöity","Mini", "Keski", "Laaja"]
const Service = ["siivous", "tiskaus", "imurointi", "syöttäminen", "strippaaminen"]

let init = []
let init2= []
const test = [[],[2],[0, 2, 4],[0,1,2,3,4]]
const initialState1 = MainService.map((a,i) => init[i] = {name:a,id:i,list2_id:test[i]})
const initialState2 = Service.map((a,i) => init2[i] = {name:a,id:i,data:[]})




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
            state.map((a, i) => {
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


