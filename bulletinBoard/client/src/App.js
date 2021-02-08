import React from "react";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
    return (
        <Router>
            <MainPage />
        </Router>
    );
}

export default App;
