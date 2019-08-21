//Reduxin konehuone eli kaikki reducerit

import {Lists_Load, Lists_Load_test} from './databaseLoad';



//Valitse alemmista kahdesta funktiosta se jota käytät. Toinen kannan kanssa ja toinen ilman kantaa
const init = Lists_Load_test()
//const init = Lists_Load()

//Alustuslistat jokaista reduceria varten 
const initialState1 = init[0]
const initialState2 = init[1]
const initialState3 = init[2]

console.log(initialState1)
console.log(initialState2)
console.log(initialState3)


//Store ensimmäistä listaa (palvelutasoja) varten, jossa myös id linkit toiseen listaan (adminReducer2)
export const adminReducer = (state = initialState1, action) => {
    switch(action.type) {
        //Lisätään uusi palvelutaso
        case 'ADD_LIST1':  
            return [...state,
                {name: action.name,
                id: state.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1,
                list2_id: []
                }]
        //Muokataan id linkkilistaa toiseen reduceriin muutosten yhteydessä        
        case 'EDIT_LIST1':              
            return state.map((item, index) => 
                index === action.index ?
                {...item, list2_id: action.list2_id} :
                item     
            )
        //Poistetaan id list2 listasta eli linkki toiseen reduceriin ja palvelulistaan      
        case 'REMOVE_ID':
            const temp = [...state]
            state.forEach((a, i) => {
                const temp_id = a.list2_id.filter(b => b !== action.id2)
                temp[i].list2_id = temp_id
            })
            return temp
        //Poistetaan palvelutaso    
        case 'DELETE_LIST1':       
            return state.filter(item =>
                item.id !== action.id)
          
        default:
            return state
   }
}

//Store, joka sisältää palvelut ja niihin liittyvät tiedot
export const adminReducer2 = (state = initialState2, action) => {
    switch(action.type) {
        //Lisätään palvelu
        case 'ADD_LIST2':
            return [...state,
                {name: action.name,
                id: state.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1,
                data:[]
                 }]
        //Lisätään uusi tieto palveluun liittyen         
        case 'ADD_DATA':           
            const data_with_id = {...action.data,
                id: state[action.index].data.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1}                                                             
            return state.map((item, i) =>
                i === action.index ?
                    { ...item, data: [...item.data, data_with_id] } : item
            )
        //Poistetaan tieto palveuun liittyen        
        case 'DELETE_DATA':
            const new_data = [...state[action.list_index].data].filter(item => item.id !== action.id)
            return state.map((item, i) =>
                i === action.list_index ?
                    { ...item, data: new_data } : item)        
        //Poistetaan palvelu        
        case 'DELETE_LIST2':       
            return state.filter(item =>
                item.id !== action.id)
                   
        default:
            return state
   }
}

//Store, asiakkaan tehdyistä valinnoista palvetasosta, palveluista ja palvelun tiedoista
export const customerReducer = (state = initialState3, action) => {
    switch(action.type) {
        //Palautetaan asiakkaan valittu palvelutaso
        case 'CHECK_LIST1':
            return { ...state, list1: action.list1_index }
        //Palautetaan asiakkaan valitsemat palvelut           
        case 'CHECK_LIST2':
            return { ...state, list2: action.list2_index }
        //Tallennetaan asiakkaan täyttämät tiedot palveluihin liittyen
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
