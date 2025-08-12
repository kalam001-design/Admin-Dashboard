import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API delay + fake DB
let fakeDB = [
    { id: 1, title: 'Product A', price: 100, stock: 10, status: 'Active' },
    { id: 2, title: 'Product B', price: 150, stock: 5, status: 'Inactive' },
    { id: 3, title: 'Product C', price: 200, stock: 0, status: 'Active' },
];

// Simulate network delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    await delay(800);
    return fakeDB;
});

// Add a new product
export const addProduct = createAsyncThunk('products/add', async (product) => {
    await delay(500);
    const newProduct = { ...product, id: Date.now() };
    fakeDB.push(newProduct);
    return newProduct;
});

// Update product
export const updateProduct = createAsyncThunk('products/update', async (product) => {
    await delay(500);
    const index = fakeDB.findIndex(p => p.id === product.id);
    if (index === -1) throw new Error('Product not found');
    fakeDB[index] = product;
    return product;
});

// Delete product
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    await delay(500);
    fakeDB = fakeDB.filter(p => p.id !== id);
    return id;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // add
            .addCase(addProduct.pending, (state) => {
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // update
            .addCase(updateProduct.pending, (state) => {
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const idx = state.items.findIndex(p => p.id === action.payload.id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // delete
            .addCase(deleteProduct.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
