export const editChecked1 = checked => ({
    type: 'EDIT_CHECKED1',
    checked
})
export const editChecked2 = checked => ({
    type: 'EDIT_CHECKED2',
    checked
})
export const editList1 = (index, list2_id) => ({
    type: 'EDIT_LIST1',
    index,
    list2_id
})
export const addList1 = name => ({
    type: 'ADD_LIST1',
    name
})
export const deleteList1 = id => ({
    type: 'DELETE_LIST1',
    id
})
export const removeId = id2 => ({
    type: 'REMOVE_ID',
    id2
})
export const addList2 = name => ({
    type: 'ADD_LIST2',
    name
})
export const addData = (data, index) => ({
    type: 'ADD_DATA',
    data,
    index
})
export const deleteData = (id, list_index) => ({
    type: 'DELETE_DATA',
    id,
    list_index
})
export const deleteList2 = id => ({
    type: 'DELETE_LIST2',
    id
})
export const checkList1 = (list1_index) => ({
    type: 'CHECK_LIST1',
    list1_index
})
export const checkList2 = (list2_index) => ({
    type: 'CHECK_LIST2',
    list2_index
})
export const saveData = (data, list2_index) => ({
    type: 'SAVE_DATA',
    data,
    list2_index
})