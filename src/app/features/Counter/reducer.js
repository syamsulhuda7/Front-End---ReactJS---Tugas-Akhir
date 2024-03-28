import * as counter from "./constants";

const initialState = JSON.parse(localStorage.getItem('counterState')) || {
    carts: []
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case counter.ADDPRODUCT: {
            const product = action.payload;
            const existingProduct = state.carts.find(item => item.id === product.id);
            // const qtyProduct = state.carts.find(item => item.qty >= 1)

            // Jika produk sudah ada di local storage, update qty
            if (existingProduct && state.carts.find(item => item.qty >= 0)) {
                const updatedCarts = state.carts.map(item =>
                    item.id === product.id
                        ? { ...item, qty: parseInt(item.qty) + parseInt(product.qty)}
                        : item
                );
                const updatedState = { ...state, carts: updatedCarts };
                localStorage.setItem('counterState', JSON.stringify(updatedState));
                return updatedState;
            } else if (!existingProduct) {
                // Jika produk belum ada di local storage, tambahkan
                const newProduct = {
                    id: product.id,
                    name: product.name,
                    img: product.img,
                    qty: product.qty
                };
                const updatedCarts = [...state.carts, newProduct];
                const newState = { ...state, carts: updatedCarts };
                localStorage.setItem('counterState', JSON.stringify(newState));
                return newState;
            } else {
                // Jika qty produk kurang dari 1, tidak lakukan perubahan dan kembalikan state saat ini
                return state;
            }
        }
        case counter.MINQTY: {
            const product = action.payload;
            // const existingProduct = state.carts.find(item => item.id === product.id);

            if (state.carts.find(item => item.id==product.id && item.qty >= 1)) {
                const updatedCarts = state.carts.map(item =>
                    item.id === product.id
                        ? { ...item, qty: parseInt(item.qty) - parseInt(product.qty)}
                        : item
                );
                const updatedState = { ...state, carts: updatedCarts };
                localStorage.setItem('counterState', JSON.stringify(updatedState));
                return updatedState;
            } else {
                // Jika qty produk kurang dari 1, tidak lakukan perubahan dan kembalikan state saat ini
                return state;
            }
        }
        default:
            return state;
    }
};

export default counterReducer;