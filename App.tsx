import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
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
            <Router>
                <ThemeProvider theme={theme}>
                    <Main />
                </ThemeProvider>
            </Router>
        </Provider>
    );
}

createRoot(document.getElementById("react-container")).render(<App />);