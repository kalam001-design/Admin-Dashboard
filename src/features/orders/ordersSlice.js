import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let fakeOrdersDB = [
    { id: 1001, customer: "John Doe", total: 80, status: "Shipped" },
    { id: 1002, customer: "Jane Smith", total: 40, status: "Pending" },
    { id: 1003, customer: "Mike Ross", total: 60, status: "Delivered" },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
    await delay(700);
    return fakeOrdersDB;
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }) => {
    await delay(500);
    const idx = fakeOrdersDB.findIndex(order => order.id === id);
    if (idx === -1) throw new Error('Order not found');
    fakeOrdersDB[idx].status = status;
    return { id, status };
});

export const deleteOrder = createAsyncThunk('orders/delete', async (id) => {
    await delay(500);
    fakeOrdersDB = fakeOrdersDB.filter(order => order.id !== id);
    return id;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                const idx = state.items.findIndex(order => order.id === id);
                if (idx !== -1) state.items[idx].status = status;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.items = state.items.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default ordersSlice.reducer;
