import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Create from "./Create";
import Read from "./Read";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Read</Link>
                        </li>
                        <li>
                            <Link to="/create">Create</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/create">
                        <Create />
                    </Route>
                    <Route path="/">
                        <Read />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
