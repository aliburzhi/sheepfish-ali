import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { addPostModalSlice } from "./addPostModal/addPostModalSlice";
import { productsSlice } from "./productsSlice/productsSlice";

const persistConfig = {
	key: "root",
	storage,
};

const persistedProductsReducer = persistReducer(persistConfig, productsSlice.reducer);

export const store = configureStore({
	reducer: {
		products: persistedProductsReducer,
		addPostModal: addPostModalSlice.reducer,
	},
});

export const persistor = persistStore(store);
