import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    isDarkMode: boolean;
    isLoggedIn: boolean;
}

const initialState: AppState = {
    isDarkMode: window.localStorage.getItem("isDarkMode") === "true",
    isLoggedIn: false
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state: AppState) => {
            state.isDarkMode = !state.isDarkMode;
            window.localStorage.setItem("isDarkMode", (state.isDarkMode).toString());
        },
        setIsLoggedIn: (state: AppState, action: { payload: boolean }) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const { toggleDarkMode, setIsLoggedIn } = appSlice.actions;

export default appSlice.reducer;