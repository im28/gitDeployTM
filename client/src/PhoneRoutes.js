import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthContext from './context/auth-context';
import Cookies from "js-cookie";
import PhoneMain from "./phone/Main/Main";
import PhoneSummary from "./phone/Summary/Summary"
import PhoneRegister from "./phone/Register/SignUp"
import PhoneDefault from "./phone/Welcome/Welcome"
import PhoneProfile from "./phone/Profile/Profile";
import PhoneLogin from "./phone/Login/Login"
import Forgot from "./phone/Login/Forgot"
 
class Routes extends Component{

    login = () =>{
        this.setState({token: Cookies.get("token"), userId: Cookies.get("userId"), tokenExpiration: Cookies.get("tokenExpiration")});
    };

    logout = () => {
        this.setState({token: null, userId: null, tokenExpiration: null})
        Cookies.remove("token")
        Cookies.remove("userId");
        Cookies.remove("tokenExpiration")
        Cookies.remove("rolesBtn")
        Cookies.remove("btnExit")
        Cookies.remove("userName")
    };

    render(){
        return(
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider value={{
                        login: this.login,
                        logout: this.logout,
                    }}>
                        <Switch>

                            {!Cookies.get("token") && <Route exact path = "/" component = { PhoneDefault } />}
                            {!Cookies.get("token") && <Route path = "/Login" component = { PhoneLogin } />}
                            {!Cookies.get("token") && <Route path = "/Forgot" component = { Forgot } />}
                            <Route path = "/Default" component = { PhoneDefault } />
                            <Route path = "/Register" component = { PhoneRegister } />
                            {Cookies.get("token") && < Route path = "/Main" component = { PhoneMain } />}
                            {Cookies.get("token") && <Route exact path = "/" component = { PhoneMain } />}
                            {Cookies.get("token") && < Redirect from = "/Login" to = "/Main" component = { PhoneMain }/>}
                            {!Cookies.get("token") && < Redirect to = "/Login" component = {PhoneLogin } />}
                            {Cookies.get("token")  &&< Route path = "/Summary" component = { PhoneSummary } />}
                            {Cookies.get("token")  &&< Route path = "/Profile" component = { PhoneProfile } />}

                        </Switch>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default Routes;