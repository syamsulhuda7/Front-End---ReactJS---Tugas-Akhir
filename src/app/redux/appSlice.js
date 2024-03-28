// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     carts: localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : false
// };

// export const counterSlice = createSlice({
//     name: 'app',
//     initialState,
//     reducers: {
//         addProduct: (state, action) => {
//             const Product = action.payload;
//             const productInCart = state.carts.find(item => item.id === Product.id)
//             if (productInCart) {
//                 productInCart.qty = productInCart.qty + Product.qty
//             } else {
//                 state.carts.push({
//                     id: '',
//                     name: '',
//                     qty: Product.qty
//                 })
//             }
//             localStorage.setItem('carts', JSON.stringify(state.carts))
//         }
//     }
// });

// export default counterSlice.reducer;