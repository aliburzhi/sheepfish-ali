import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../productsOperation/productsOperation";

interface Product {
	id: number;
	title: string;
	description: string;
	images: string[];
	price: number;
	stock: number;
	rating: number;
	category: string;
}

export const productsSlice = createSlice({
	name: "products",
	initialState: { data: [], status: "idle", error: null } as any,
	reducers: {
		addProduct(state, action: PayloadAction<Product>) {
			state.data.unshift(action.payload);
		},
		removeProduct(state, action: PayloadAction<number>) {
			state.data = state.data.filter((product: Product) => product.id !== action.payload);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.status = "loading";
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload.products;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { addProduct, removeProduct } = productsSlice.actions;
