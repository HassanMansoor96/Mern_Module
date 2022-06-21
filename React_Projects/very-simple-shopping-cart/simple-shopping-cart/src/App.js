import Header from './components/Header'
import Main from './components/Main'
import Basket from './components/Basket'
import data from './data'
import { useState } from 'react'

function App() {
  const { products } = data
  const [cartItems, setCartItems] = useState([])
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id)
    if (exist) { // if the product is in the cart implement quantity 
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      )
    } else { //and if not add it to the cart
      setCartItems([...cartItems, { ...product, qty: 1 }])
    }
  }

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id)
    if (exist.qty === 1) { // there is only 1 left,take it out the cart
      setCartItems(cartItems.filter((x) => x.id !== product.id))
    } else { // the product quantity is more than one so decreased by 1
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      )
    }
  }
  return (
    <div className='App'>
      <Header countCartItems={cartItems.length}></Header>
      <div className='row'>
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  )
}

export default App
