// productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state for your slice
const initialState = {
  data: [],       // The fetched data will be stored here
  status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  setShow:false,
  editProduct:null
  
     // Will store any error that occurs during the fetch
};

// Define an asynchronous thunk action to fetch products
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  try {
    const response = await axios.get('http://localhost:4000/products');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define an asynchronous thunk action to add a new product
export const addProduct = createAsyncThunk('products/add', async (productData:any) => {
  try {
    console.log(productData);
    
    const response = await axios.post('http://localhost:4000/products', productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // You can return the newly added product data if needed
  } catch (error) {
    throw error;
  }
});
//Edit product async thunk 
export const updateProduct = createAsyncThunk('products/update', async (productData: any) => {
  try {
    console.log(productData)
    const { id, ...updatedData } = productData;
    const response = await axios.put(`http://localhost:4000/products/${id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // You can return the updated product data if needed
  } catch (error) {
    throw error;
  }
});

// Create the productSlice
const productSlice:any = createSlice({
  name: 'products',
  initialState,
  reducers: {
     handleShow:(state) => {  
      state.setShow=true;
     },
     handleClose:(state) => {
      state.setShow=false;
     },
     setEditProduct: (state:any, action) => {
      state.editProduct = action.payload;
    },
    updateEditedProduct: (state:any, action) => {
      // Update the edited product data in the state
      state.data = state.data.map((product:any) =>
        product._id === action.payload._id ? { ...product, ...action.payload } : product
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state:any) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.data = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state:any) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        // If you want to update the product list with the newly added product,
        // you can push the new product into the state.data array.
         console.log(">>>>"+action.payload);
        
        // state.data.push(action.payload.newProduct);
        console.log(state.data)
      })
      .addCase(addProduct.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateProduct.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        // Dispatch the "updateEditedProduct" action to update the product in the state
        state.data = state.data.map((product:any) =>
          product._id === action.payload._id ? { ...product, ...action.payload } : product
        );
      })
      .addCase(updateProduct.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {handleShow,handleClose,setEditProduct,updateEditedProduct}=productSlice.actions
export default productSlice.reducer;
