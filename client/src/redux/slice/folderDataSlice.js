import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderData: {
    folders: [],
    totalPages: 1,
    currentPage: "1",
  },
  breadcrumb:[],
};

const folderDataSlice = createSlice({
  name: "folderDataSlice",
  initialState,
  reducers: {
    setFolderData: (state, action) => {
        state.folderData = action.payload;
    },
    setBreadcrumb : (state, action) =>{
        state.breadcrumb = action.payload;

    }
  },
});

export const { setFolderData, setBreadcrumb } = folderDataSlice.actions;
export default folderDataSlice.reducer;
