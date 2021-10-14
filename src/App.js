import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import Mainpage from "./Components/MainPage/Mainpage";
import Mainpage2 from "./Components/MainPage/MainPage2";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route>
            <Mainpage2 exact path="/fetch_with_auth" />
          </Route>
          <Route>
            <Mainpage exact path="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
