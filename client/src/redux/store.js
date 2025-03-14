import { configureStore } from "@reduxjs/toolkit";
import folderDataReducer from "./slice/folderDataSlice"


const store = configureStore({
    reducer: {
        folderData : folderDataReducer
    }
});


export default store;