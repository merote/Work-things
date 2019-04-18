import React from 'react'
import CheckboxList from './CheckboxList';
import AdminList from './adminList';
import AdminList2 from './adminList2';



const App = (props) => {
  const store = props.store
  
  return (
    <div>
      <AdminList store={store}/> 
      
    </div>
  )
}

export default App