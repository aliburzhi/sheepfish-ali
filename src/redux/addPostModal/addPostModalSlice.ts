import { createSlice } from "@reduxjs/toolkit";

export const addPostModalSlice = createSlice({
	name: "addPostModal",
	initialState: false,
	reducers: {
		openAddPostModal(state) {
			return true;
		},
		closeAddPostModal(state) {
			return false;
		},
	},
});

export const { openAddPostModal, closeAddPostModal } = addPostModalSlice.actions;
