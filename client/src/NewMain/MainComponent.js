import React, {Component} from 'react';
import styles from "./maincomponent.module.sass";
import Cookies from "js-cookie";
import AuthContext from '../context/auth-context';
import Main from "./ChildComponent/Main/Main";
import Profil from "./ChildComponent/Profil/Profil";
import Summary from "./ChildComponent/Summary/Summary";
import Admin from "./ChildComponent/Admin/Admin"

class MainComponent extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
            mainPage: true,
            isAdmin: 0,
            firstname: ""
        };
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
        this.userInformation();
    }

    userInformation() {
        const information = JSON.parse(Cookies.get("information"))
        const isAdmin = JSON.parse(Cookies.get("isAdmin"))

        this.setState({
            isAdmin: isAdmin,
            firstname: information.firstname
        })
    }

    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 1920;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    openPage = modalType => () => {
        if (modalType === "MainPage") {
          this.setState({
            mainPage: true,
            summaryPage: false,
            profilePage: false,
            adminPage: false
          });
        } else if (modalType === "ProfilePage") {
          this.setState({
            profilePage: true,
            mainPage: false,
            summaryPage: false,
            adminPage: false
          });
        }
        else if (modalType === "SummaryPage") {
            this.setState({
              summaryPage: true,
              profilePage: false,
              mainPage: false,
              adminPage: false
            });
        }
        else if (modalType === "AdminPage") {
            this.setState({
                adminPage: true,
              summaryPage: false,
              profilePage: false,
              mainPage: false
            });
        }
    }

    render(){
        return(
            <div className={ styles.container} style={{transform: this.state.transform}}>
                    <div className={ styles.profil} onClick={this.openPage("ProfilePage")}></div>
                    <div className={ styles.profilText}>{this.state.firstname}</div>

                    <div className={ styles.nextWeek} onClick={this.openPage("MainPage")}>
                        <div className={ styles.nextWeekIcon}></div>
                    </div>
                    <div className={ styles.nextWeekText}>Next Week</div>

                    <div className={ styles.summary} onClick={this.openPage("SummaryPage")}>
                        <div className={ styles.summaryIcon}></div>
                    </div>
                    <div className={ styles.summaryText}>Summary</div>

                    <div style={{display: this.state.isAdmin ? "inline" : "none"}}>
                        <div className={ styles.admin} onClick={this.openPage("AdminPage")}>
                            <div className={ styles.adminIcon}></div>
                        </div>
                        <div className={ styles.adminText}>Admin</div>
                    </div>
                    
                    <Main 
                        show= {this.state.mainPage} 
                        onClose={this.openPage("MainPage")}
                    />
                    <Profil 
                        show= {this.state.profilePage}
                        onClose={this.openPage("ProfilePage")}
                        user={this.state.firstname}
                        ref="refresh"
                    />
                    <Summary 
                        show= {this.state.summaryPage} 
                        onClose={this.openPage("SummaryPage")}
                    />
                    <Admin
                        show= {this.state.adminPage} 
                        onClose={this.openPage("AdminPage")}
                    />
                    <button className={ styles.logout} onClick={this.context.logout}>Logout</button>
            </div>
        )
    }
}

export default MainComponent;