import axios from 'axios'

const getList1 = async () => {
    const response = await axios.get('/api/palvelutasot')
    return response.data
}

const getList2 = async () => {
    const response = await axios.get('/api/palvelut')
    return response.data
}  


export const Lists_Load = () => {

    const data1 = getList1()
    const tasot_redux = []
    data1.then(data => {
        data.forEach((a,i) => {
            tasot_redux[i] = {
                name: a.kuvaus,
                id: a.id,
                list2_id: a.palvelut.length > 0 ? a.palvelut.map(b => b.id) : []
            }
        })
    })

/*    const data2 = getList2()
    const palvelut_redux = []
    data2.then(data => {
        data.forEach((a,i) => {
            palvelut_redux[i] = {
                name: a.kuvaus,
                id: a.id,
                data: []
            }
        })
    });*/

    const data2 = getList2()
    const palvelut_redux = []
    const data_redux = []
    data2.then(data => {
        data.forEach((a, i) => (
            palvelut_redux[i] = {
                name: a.kuvaus,
                id: a.id,
                data: []
            }
            , data_redux[i] = []
        ))
    });

    console.log(palvelut_redux)
    //const data_redux = palvelut_redux.map(() => [])
    console.log(data_redux)
    const asiakas_redux = {list1: -1, list2: [], data: data_redux}
    
    //const asiakas_redux = {}
    const data = [tasot_redux, palvelut_redux, asiakas_redux]
    return data
}

export const Lists_Load_test = () => {



//    const promise = axios.get('/api/palvelutasot')    
//    const test = promise.then(response => {
    
/*        tasot.forEach((a,i) => {
            tasot_redux[i] = {
                name: a.kuvaus,
                id: a.id,
                list2_id: a.palvelut.length > 0 ? a.palvelut.map(b => b.id-1) : []
            }
        })   
*/


    

    
    //console.log(test)
/*
        console.log('TEST4')
        const promise = axios.get('/api/palvelut')    
        promise.then(response => {
            const palvelut = response.data
            console.log(palvelut)
            const palvelut_redux = []
            palvelut.forEach((a,i) => {
                palvelut_redux[i] = {
                    name: a.palvelunNimi,
                    id: i,
                    data: []
                }
            })        
        return palvelut_redux
    })       
 */   
 //   console.log(tasot_redux)
  
    //return (list_number === 1 ? tasot_redux : palvelut_redux)
    
    const tasot = [
        {   id : 1,    
            "kuvaus": "Räätälöity",
            "palvelut": []
        },
        {   id : 2,
            "kuvaus": "Mini",
            "palvelut": []
        },
        {   id : 3,
            "kuvaus": "Keski",
            "palvelut": [
                {kuvaus: "test", id: 5},
                { kuvaus: "dafafafa", id: 8}
            ]
        },
        {   id : 4,
            "kuvaus": "Laaja",
            "palvelut": []
        }
    ]

    const palvelut = [
        {   id: 4,
           "palvelunNimi": "Eka",
            "kentat": []
        },
        {   id: 5,
            "palvelunNimi": "test",
            "kentat": []
        },
        {   id: 7,
            "palvelunNimi": "Toka",
            "kentat": []
        },
        {   id: 8,
            "palvelunNimi": "dafafafa",
            "kentat": []
        }
    ]

    const tasot_redux = []
    tasot.forEach((a,i) => {
        tasot_redux[i] = {
            name: a.kuvaus,
            id: a.id,
            list2_id: a.palvelut.length > 0 ? a.palvelut.map(b => b.id) : []
        }
    })
    

    const palvelut_redux = []
    palvelut.forEach((a,i) => {
        palvelut_redux[i] = {
            name: a.palvelunNimi,
            id: a.id,
            data: []
        }
    })        
    const choices1= [{name: "eka", price: 1},{name: "toka", price: 2},{name: "kolmas", price: 3}]
    const choices2= [{name: "Test", price: ""},{name: "Test2", price: ""}]
    
    const data1 = [{type: "text", name: "Anna nimi", input_type: "text", required: false, id: 0},
    {type: "checkbox", name: "Valitse sopiva", multiple: false, choises: choices1, required: false, id: 1}]

    const data2 = [{type: "checkbox", name: "Valinnat", multiple: false, choises: choices2, required: false, id:0}]

    palvelut_redux[1].data = data1
    palvelut_redux[3].data = data2

    const data_redux = palvelut_redux.map(() => [])
    const asiakas_redux = {list1: -1, list2: [], data: data_redux}

    return   [tasot_redux, palvelut_redux, asiakas_redux]

}

