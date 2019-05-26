import React, { useState } from 'react'
import CheckboxList from './CheckboxList';
import AdminList from './adminList';
import ShoppingList from './shoppingList'
import Button from '@material-ui/core/Button';
import Extra from './extra.js'
import FrontPage from './frontPage.js'

const buttons = ["Etusivu", "Asiakas", "Admin", "Ostoslista", "Extra"]


const App = (props) => {
  const store = props.store
  
  const [page, setPage] = useState(0)
  
  return (
    <div>
      {buttons.map((name,i) => (
        <Button key ={i} variant="outlined" color="primary"
          onClick={() => setPage(i)}
        >
        {name}  
        </Button>
      ))
    }
    <div></div>
      {page === 0 
      ? <FrontPage />
      : page === 1 
      ? <CheckboxList store={store}/>        
      : page === 2  
      ? <AdminList store={store}/>
      : page === 3  
      ? <ShoppingList store={store}/>
      : <Extra />}
    </div>
  )
}

export default App

/*  return (
    <div>
        <Button variant="outlined" color="primary" 
          onClick={page === 1 ? () => setPage(2)
          : () =>  setPage(1)}>
          Vaihda näkymä
        </Button>
  
    <div></div>
      {page === 1 
      ? <CheckboxList store={store}/> 
      : <AdminList store={store}/>}
    </div>
  )
}*/