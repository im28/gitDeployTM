import React, {Component} from 'react';
import styles from "./searchMember.module.sass";
import {SearchMemberHTTP} from "../../../HTTP/SearchMember";
import {GetAllUserNameHTTP} from "../../../HTTP/GetAllUserName";
import CreatableSelect from 'react-select/creatable';

const customStyles = {
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        top: "68px",
        left: "545px",
        width: "559px",
        border: "none",
        borderBottom: "2px solid #004165",
        textAlign: "left",
        font: "Bold 30px Montserrat",
        color: "#004165",
        opacity: "0.32",
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      borderRadius: '0',
      minHeight: '1px',
      height: '71px',
      boxShadow: 'none'
    }),
    // input: (provided) => ({
    //   ...provided,
    //   minHeight: '1px',
    // }),
    // dropdownIndicator: (provided) => ({
    //   ...provided,
    //   minHeight: '1px',
    //   paddingTop: '0',
    //   paddingBottom: '0',
    //   color: '#757575',
    // }),
    // indicatorSeparator: (provided) => ({
    //   ...provided,
    //   minHeight: '1px',
    //   height: '24px',
    // }),
    // clearIndicator: (provided) => ({
    //   ...provided,
    //   minHeight: '1px',
    // }),
    // valueContainer: (provided) => ({
    //   ...provided,
    //   minHeight: '1px',
    //   height: '40px',
    //   paddingTop: '0',
    //   paddingBottom: '0',
    // }),
    // singleValue: (provided) => ({
    //   ...provided,
    //   minHeight: '1px',
    //   paddingBottom: '2px',
    // }),
  };

class SearchMember extends Component{
    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
    }

    state = {
        firstname: "",
        lastname: "",
        email: "",
        roles: [],
        totalRoles: 0,
        points: 0,
        trophies: 0,
        options: null,
        show: false
    }

    componentDidMount() {
        this.getUserName()
    }

    async getUserName(){
        const userInfo = await GetAllUserNameHTTP();

        if(!userInfo){
            console.log("null")
            return;
        }
        let newOption = [];

        for(let i = 0; i<userInfo.length;i++){
            newOption.push({
                value: userInfo[i]._id,
                label: userInfo[i].information.firstname + " " + userInfo[i].information.middlename + " " + userInfo[i].information.lastname,
                }
            )
        }
        this.setState({
            options: newOption
        })
    }

    onClose = (e) => {
        this.setState({
            firstname: ""
        })
        this.props.onClose && this.props.onClose(e);
    }

    async fetchUsers(userId){

        const userInformation = await SearchMemberHTTP(userId);

        if(userInformation){
            this.setState({
                firstname: userInformation.information.firstname,
                lastname: userInformation.information.lastname,
                email: userInformation.information.email,
                roles: userInformation.role,
                totalRoles: userInformation.gamifications.totalRoles,
                points: userInformation.gamifications.points,
                trophies: userInformation.gamifications.trophies
            })
        }
        else{
            window.alert("No member found !");
            return;
        } 
    }

    roleTable = () => {
        const roles = [
            "Toastmaster of the evening",
            "Surgent At Arms",
            "Grammarian",
            "Ah-Counter",
            "General Evaluator",
            "Topics Master",
            "Speaker 1",
            "Speaker 2",
            "Speaker 3",
            "Speaker 4",
            "Evaluator 1",
            "Evaluator 2",
            "Evaluator 3",
            "Evaluator 4"
        ]
        var count = 0;
        var array = ["-","-","-","-","-","-","-","-","-","-","-","-","-","-"]

        var sortedDated = [{
            roleName: "",
            date: ""
        }]

        for(var i = 0; i < this.state.roles.length; i++){
            sortedDated.push({
                roleName: this.state.roles[i].roleName,
                date:  this.state.roles[i].expiryDate.date
            })
        }

        sortedDated.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
        })

        for(var j = 0; j<14; j++){
            for(var x = 0; x<sortedDated.length; x++){
                if(roles[j]===sortedDated[x].roleName){
                    array[j]=sortedDated[x].date
                } 
            }
        }
        
        const doubled = array.map((roleName) => {
            return <div key={count++} className={styles.roleName}>{roleName}</div>
        });

        return(
            <div className={styles.nameContainer}>
                {doubled}             
            </div>
        )
    }
    handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
      };
      handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        if(newValue!==null) {
            this.fetchUsers(newValue.value)
            this.setState({
                show: true
            })
        }
        else {
            this.setState({
                show: false
            })
        }
        
      };
    showAll = () => {
        if(this.state.show === true){
            return (
                <div>
                    <div className={styles.containerProfil}>
                        <div className={styles.memberName}>{this.state.firstname + " " + this.state.lastname}</div>
                        <button className={styles.changeUserName}>Change email</button>
                        <button className={styles.changePassword}>Change password</button>
                        <div className={styles.profilPic}></div>
                        <div className={styles.statusRole}>
                            <div className={styles.statusValue}>{this.state.totalRoles}</div>
                            <div className={styles.statusText}>Roles taken</div>
                        </div>
                        <div className={styles.statusPoint}>
                            <div className={styles.statusValue}>{this.state.points}</div>
                            <div className={styles.statusText}>Points</div>
                        </div>
                        <div className={styles.statusTrophies}>
                            <div className={styles.statusValue}>{this.state.trophies}</div>
                            <div className={styles.statusText}>Trophies</div>
                        </div>     
                    </div>
                    <div className={styles.recordContainer}>
                        <div className={styles.roleTitle}>Role</div>
                        <div className={styles.dateTitle}>Date</div>
                        <div className={styles.roleContainer}>
                            <div className={styles.roleName}>Toastmaster of the evening</div>
                            <div className={styles.roleName}>Surgent At Arms</div>
                            <div className={styles.roleName}>Grammarian</div>
                            <div className={styles.roleName}>Ah-Counter</div>
                            <div className={styles.roleName}>General Evaluator</div>
                            <div className={styles.roleName}>Topics Master</div>
                            <div className={styles.roleName}>Speaker 1</div>
                            <div className={styles.roleName}>Speaker 2</div>
                            <div className={styles.roleName}>Speaker 3</div>
                            <div className={styles.roleName}>Speaker 4</div>
                            <div className={styles.roleName}>Evaluator 1</div>
                            <div className={styles.roleName}>Evaluator 2</div>
                            <div className={styles.roleName}>Evaluator 3</div>
                            <div className={styles.roleName}>Evaluator 4</div>
                        </div>
                    {this.roleTable()}
                    </div>
                </div>
            )
        }
        else{
            return null;
        }
    }

    render(){
        if (!this.props.show){
            return null;
        }

        return(
            <div>
                    <div className={styles.background}>
                        {/* <input className={styles.searchBar} placeholder="Search member" type="text" ref={this.usernameEl}/> */}
                        <button className={styles.backBtn} onClick={(e) => {this.onClose(e)}}>Back</button>
                        <button className={styles.searchBtn} >Search</button>
                        {this.showAll()}
                        <CreatableSelect
                            isClearable
                            onChange={this.handleChange}
                            onInputChange={this.handleInputChange}
                            options={this.state.options}
                            styles={customStyles}
                        />
                    </div>
            </div>
        )
    }
}

export default SearchMember;