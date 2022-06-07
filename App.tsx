import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./Main";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Main />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
}

createRoot(document.getElementById("react-container")).render(<App />);