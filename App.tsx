import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./Main";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
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

ReactDOM.render(<App />, document.getElementById("react-container"));