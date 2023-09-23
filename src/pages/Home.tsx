import React from 'react'
import Products from '../components/ProductsList'

const Home = () => {
  return (
    <div>
      <h1>This is home</h1>
      <section>
        <h3>Products</h3>
        <Products/>
      </section>
    </div>
  )
}

export default Home
