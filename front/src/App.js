import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import * as UserService from "./service/user-service";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Play from "./components/Play";
import LoginDialog from "./components/LoginDialog";
import UserContext from "./context/UserContext";
import Container from "@material-ui/core/Container";
import AutomatonGuide from "./components/AutomatonGuide";
import PlayGuide from "./components/PlayGuide";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./components/Footer";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {

  const [user, setUser] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const api = async () => {
      const user = await UserService.getUser();
      setUser(user);
    }
    api();
  }, []);

  return (
    <div className="App">
      <CssBaseline/>
      <Suspense fallback="loading">
        <UserContext.Provider value={user}>
          <Router>
            <Header setShowLoginModal={setShowLoginModal}/>
            <Container id="app" style={{background: '#A8e4ff'}} maxWidth="lg">
              <LoginDialog open={showLoginModal} setOpen={setShowLoginModal}/>
              <div className="grid-x grid-margin-x">
                <Switch>
                  <Route path="/play/:questionId" component={Play}/>
                  <Route path="/automaton_guide" component={AutomatonGuide}/>
                  <Route path="/play_guide" component={PlayGuide}/>
                  <Route path="/terms_of_service" component={TermsOfService}/>
                  <Route path="/privacy_policy" component={PrivacyPolicy}/>
                  <Route path="/" component={Home}/>
                </Switch>
              </div>
            </Container>
            <Footer/>
          </Router>
        </UserContext.Provider>
      </Suspense>
    </div>
  );

}

export default App;
