import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductForm from './pages/AddForm';
import Navbar from './components/Top';
import Products from './components/ProductsList';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Products />} />
          {/* Pass a dummy onClose function */}
          {/* <Route path='/addproduct' element={<ProductForm onClose={() => {}} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
