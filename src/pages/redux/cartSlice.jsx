import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
// const initialState = JSON.parse(localStorage.getItem('cart')) ;
// const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload); // Use action.payload
        }
    }
});

// Export actions
export const { addToCart, deleteFromCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer; // Correctly export the reducer
