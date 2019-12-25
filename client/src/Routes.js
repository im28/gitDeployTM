import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
// import Login from "./Login/Login";
import Default from "./Default/Default";
import Start from "./Start/Start";
import Search from "./MergedComponent/Main/Admin/SearchMember";
import Register from "./Register/Register";
import MainComponent from "./MergedComponent/Main"
import Login2 from "./MergedComponent/Login"
import Forgot from "./MergedComponent/Forgot"
import Agenda from "./MergedComponent/Agenda"
import AuthContext from './context/auth-context';
import Cookies from "js-cookie";
 
class Routes extends Component{

    login = () =>{
        this.setState({token: Cookies.get("token"), userId: Cookies.get("userId"), tokenExpiration: Cookies.get("tokenExpiration")});
    };

    logout = () => {
        this.setState({token: null, userId: null, tokenExpiration: null})
        Cookies.remove("token")
    };

    render(){
        return(
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider value={{
                        login: this.login,
                        logout: this.logout
                    }}>
                        <Switch>
                            {!Cookies.get("token") && <Route exact path = "/" component = { Default } />}
                            {!Cookies.get("token") && <Route path = "/Login" component = { Login2 } />}
                            {!Cookies.get("token") && <Route path = "/Forgot" component = { Forgot } />}
                            <Route path = "/Default" component = { Default } />
                            <Route path = "/Start" component = { Start } />
                            <Route path = "/Register" component = { Register } />
                            <Route path = "/agenda" component = { Agenda } />
                            <Route path = "/Search" component = { Search } />
                            {/* <Route path = "/Login2" component = { Login2 } /> */}
                            {Cookies.get("token") && < Route path = "/Main/:id" component = {MainComponent}/>}
                            {Cookies.get("token") && < Route exact path = "/Main" component = { MainComponent } />}
                            {Cookies.get("token") && < Redirect from = "/Login" to = "/Main" component = { MainComponent  }/>}
                            {Cookies.get("token") && < Redirect from = "/" to = "/Main" component = { MainComponent } />}
                            {!Cookies.get("token") && < Redirect to = "/Login" component = {Login2 } />}
                        </Switch>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default Routes;