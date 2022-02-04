import React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Main />
            </Router>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById("react-container"));