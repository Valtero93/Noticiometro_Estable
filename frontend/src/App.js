import Inicio from "./pages/Inicio";
import React from "react";
import { TokenContextProvider } from "./components/TokenContextProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ValidateUser from "./pages/ValidateUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Perfil from "./pages/Perfil";
import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
import "./App.css";
import "./css/caja_noticia.css";
import "./css/estilo.css";
import "./css/fixed_browsers.css";
import CreateNoticia from "./pages/CreateNoticia";
import NoticiaPage from "./pages/NoticiaPage";
import NoLogin from "./pages/NoLogin";

function App() {
  return (
    <div className="App">
      <TokenContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <NoLogin />
            </Route>
            <Route exact path="/validate/:code">
              <ValidateUser />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/">
              <div className="contenedor">
                <Sidebar />
                <div className="col-2">
                  <Switch>
                    <Route exact path="/home">
                      <Inicio />
                    </Route>
                    <Route exact path="/perfil">
                      <Perfil />
                    </Route>
                    <Route exact path="/noticia/create">
                      <CreateNoticia></CreateNoticia>
                    </Route>
                    <Route exact path="/noticia/:id">
                      <NoticiaPage />
                    </Route>
                  </Switch>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </TokenContextProvider>
    </div>
  );
}

export default App;
