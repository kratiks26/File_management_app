import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderData: {
    folders: [],
    totalPages: 1,
    currentPage: "1",
  },
  breadcrumb:[],
  pageNo : 1,
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

    },
    setPageNo : (state, action) =>{
      state.pageNo = action.payload;
    }
  },
});

export const { setFolderData, setBreadcrumb, setPageNo } = folderDataSlice.actions;
export default folderDataSlice.reducer;
