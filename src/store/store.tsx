
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Action';

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
