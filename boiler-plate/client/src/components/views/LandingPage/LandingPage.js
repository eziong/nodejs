import React, { useEffect } from "react";
import axios from "axios";

function App() {
    useEffect(() => {
        axios.get("/api/hello").then((response) => console.log(response));
    }, []);
    return <div className="App">hello world</div>;
}

export default App;
