import React, {Component} from 'react';
import styles from "./admin.module.sass";
import SearchMember from "./SearchMember"
import AddMemberModal from "./AdminModal/AddMemberModal"
import AdminConfirmed from "./AdminModal/AdminConfirmedModal"
import Cookies from "js-cookie";
import {CompleteRolesHTTP} from "../../../HTTP/CompleteRoles"
import InfiniteCalendar from 'react-infinite-calendar';
import {SetMeetingHTTP} from "../../../HTTP/SetMeeting"
import style from "../../../MergedComponent/MiniComponents/miniComponents.module.sass";

import 'react-infinite-calendar/styles.css';
let colors=["#772432","#004165","#CD202C","#F2DF74"]
Date.prototype.toShortFormat = function() {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    
    return "" + day + "-" + month_names[month_index] + "-" + year;
}
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
var array = ["Null","Null","Null","Null","Null","Null","Null","Null","Null","Null","Null","Null","Null","Null"]
class Admin extends Component{
    // constructor(props) {
    //     super(props);
    // }

    state = {
        searchPage: false,
        addMemberPage: false,
        adminConfirmed: false,
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentDate: new Date().getDate(),
        dateOne: "",
        dateTwo: "",
        dateThree: "",
        month: ["January","February","Mac","April","May","Jun",
        "July","August","September","October","November","December"],
        dateIndex: [0,1,2,3,4,5,6,7,8,9,10,11],
        competedRoles: [],
        meetingDate: [],
        currentIndex: 0,
        transform: "",
        NextMeetingDate: "",
        SetMeetingDate: "",
        missingI: false,
        showCal: false,
        showCal2: false
    }

    componentDidMount() {
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
        this.getCompletedRoles()
    }

    componentWillUnmount(){
        //this.dateConverter()
    }

    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 1920;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    next = () => {
        var size = this.state.meetingDate.length

        if(size<4){
            return null;
        } 

        if(this.state.dateThree === this.state.meetingDate[size - 1]){
            return null;
        }
        else{
            this.setState({
                dateOne: this.state.meetingDate[this.state.currentIndex],
                dateTwo: this.state.meetingDate[this.state.currentIndex + 1],
                dateThree:this.state.meetingDate[this.state.currentIndex + 2],
                currentIndex: this.state.currentIndex + 1
            })
        }
    }

    previous = () => {
        var size = this.state.meetingDate.length

        if(size<1){
            return null;
        } 

        if(this.state.dateOne === this.state.meetingDate[0]){
            return null;
        }
        else{
            this.setState({
                dateOne: this.state.meetingDate[this.state.currentIndex - 2],
                dateTwo: this.state.meetingDate[this.state.currentIndex - 1],
                dateThree:this.state.meetingDate[this.state.currentIndex],
                currentIndex: this.state.currentIndex - 1
            })
        }
    }

    dateConverter =  (date) => {
        let newDate = date.split(" ");
        let completeDate = newDate[2] + " " + newDate[1] + " " + newDate[3]

        let check = completeDate.split(" ")
        if(check[0] === "undefined") completeDate = "Null"

        return completeDate
    }

    veiwDate(){
        var meetingDate = []
        for(var i = 0;i<this.state.competedRoles.length;i++){
            var check = true
            if(meetingDate.length<0){
                meetingDate.push(this.state.competedRoles[i].expiryDate.date)
            }else{
                for(var x = 0;x<meetingDate.length;x++){
                    if(meetingDate[x] === this.state.competedRoles[i].expiryDate.date){
                        check = false
                    }
                }
                if(check){
                    meetingDate.push(this.state.competedRoles[i].expiryDate.date)
                }
            }
        }

        meetingDate.sort(function(a,b){
            return new Date(a) - new Date(b)
        })
        console.log("Number: " + meetingDate.length)
        if(meetingDate.length===1){
            this.setState({
                dateOne: meetingDate[0],
            })
        }
        else if(meetingDate.length===2){
            this.setState({
                dateOne: meetingDate[0],
                dateTwo: meetingDate[1]
            })
        }
        else if(meetingDate.length>2){
            this.setState({
                dateOne: meetingDate[0],
                dateTwo: meetingDate[1],
                dateThree: meetingDate[2]
            })
        }

        this.setState({
            meetingDate: meetingDate,
            currentIndex: 0
        })

    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    openPage = modal => () => {
        if(modal === "SearchPage"){
            this.setState({
                searchPage: true,
                addMemberPage: false,
                adminConfirmed: false
            })
        }
        else if(modal === "AddMemberPage"){
            this.setState({
                addMemberPage: true,
                searchPage: false,
                adminConfirmed: false
            })
        }
        else if(modal === "AdminConfirm"){
            this.setState({
                adminConfirmed: true,
                searchPage: false,
                addMemberPage: false
            })
        }  
        else if(modal === "ClosePage"){
            this.setState({
                searchPage: false,
                addMemberPage: false,
                adminConfirmed: false
            })
        }    
    }

    getValueDropDown = (event) =>{
        this.setState({
            currentDate: 2,
            currentMonth: this.state.dateIndex[event.target.value] ,
            dateOne: 1 + " " + this.state.month[event.target.value],
            dateTwo: 2  + " " + this.state.month[event.target.value],
            dateThree: 3 + " " + this.state.month[event.target.value],
        })
    }

    dateDropDown = () => {
        const doubled = this.state.month.map((number, index) => {
            var temp = this.state.month[index].substring(0, 3);
            if(temp === this.state.currentMonth){
                return <option key={index} selected value={index}>{this.state.month[index]}</option>
            }
            else{
                return <option key={index} value={index}>{this.state.month[index]}</option>
            }
        });

        return(
            <select className={styles.dateDropDown} onChange={this.getValueDropDown}>
                {doubled}
            </select>
        )
    }

    async getCompletedRoles(){
        const isSuccess = await CompleteRolesHTTP();
        if(isSuccess){
            this.setState({
                competedRoles: isSuccess
            },() => {
                this.veiwDate()  
           })
        }
        
    }

    refreshColumn(number){
        let count = 0;
        array = ["-","-","-","-","-","-","-","-","-","-","-","-","-","-"];
        let numberarr = [this.state.dateOne,this.state.dateTwo,this.state.dateThree]
        let recordarr = [styles.recordOne,styles.recordTwo,styles.recordThree]
        for(var i = 0;i<14;i++){
            for(var x = 0; x<this.state.competedRoles.length;x++){
                if(numberarr[number] === this.state.competedRoles[x].expiryDate.date){
                    if(roles[i]===this.state.competedRoles[x].roleName){
                        array[i]=this.state.competedRoles[x].owner.information.firstname
                    }
                }
            }
        }
        const doubled = array.map((roleName) => {
            return <div key={count++} className={styles.roleName}>{roleName}</div>});

         return(
            <div className={recordarr[number]}>
                {doubled}
            </div>
        )
    }
    async handelMeetingComplete(){
        await SetMeetingHTTP(this.state.SetMeetingDate)
    }

    render(){
        if (!this.props.show){
            return null;
        }

        return(
            <div>
                <div className={styles.animateTop}>
                    <div className={styles.background} >
                        <button className={styles.searchBar} onClick={this.openPage("SearchPage")}>Search Member</button>
                        <button className={styles.searchBar} style={{left: "46px"}} onClick={this.openPage("SearchPage")}>Complete Meeting</button>
                        <input 
                            type="Text" 
                            value={this.state.NextMeetingDate}
                            placeholder="Select Meeting Date"
                            className={ this.state.missingI ? "inputError" :styles.inputDate}
                            style={{top:"163px",position:"absolute",left:"46px",fontSize:"28px", width:"400px", outline:'none'}}
                            onClick={()=>{this.setState({showCal:!this.state.showCal ? true : false})}}
                        />
                        {this.state.showCal&&
                            <i className="far fa-calendar-check"
                            onClick={()=>{
                                this.setState({showCal:false})
                                this.handelMeetingComplete();
                            }} 
                                style={{ fontSize: "40px",color: "#004165",top: "175px",left: "400px",position: "absolute",cursor: "pointer"}}></i>
                        }
                        {this.state.showCal&&
                            <InfiniteCalendar
                            className={styles.Calendar}
                            width={400}
                            height={400}
                            onSelect={(date)=>{
                                this.setState({ NextMeetingDate: date.toShortFormat(),
                                    SetMeetingDate:date})
                            }}
                            minDate={new Date()}
                            theme={{
                                selectionColor: colors[1],
                                weekdayColor: colors[1],
                                headerColor: colors[1],
                                floatingNav: {
                                    background: colors[1],
                                    color: '#FFF',
                                }
                            }}
                        />
                        }
                        
                        <button className={styles.addMemberBtn} onClick={this.openPage("AddMemberPage")}>Add Member +</button>
                        {/* <button className={styles.dateBtn}>{this.state.todayDate}</button> */}
                        {this.dateDropDown()}
                        <div className={styles.dateContainer}>
                            <div className={styles.dateOne}>
                                
                                <div className={styles.selectingDate}>{this.dateConverter(this.state.dateOne)}</div>
                                <button className={styles.dateBtnLeft} onClick={this.previous}></button>
                            </div>
                            <div className={styles.dateTwo}>
                                <div className={styles.selectingDate}>{this.dateConverter(this.state.dateTwo)}</div>
                            </div>
                            <div className={styles.dateThree}>
                                <div className={styles.selectingDate}>{this.dateConverter(this.state.dateThree)}</div>
                                <button className={styles.dateBtnRight} onClick={this.next}></button>
                            </div>
                        </div>
                        <div className={styles.roleTitle}>Roles</div>
                        <div className={styles.rolePlayer}>Roles Player</div>
                        <div className={styles.tableContainer}>
                            <div className={styles.nameContainer}>
                                {this.refreshColumn(0)}
                                {this.refreshColumn(1)}
                                {this.refreshColumn(2)}
                            </div>
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
                        </div>
                    </div>
                </div>
                <SearchMember
                    show= {this.state.searchPage}
                    onClose={this.openPage("ClosePage")}
                />
                <AddMemberModal
                    show= {this.state.addMemberPage}
                    onClose={this.openPage("AdminConfirm")}
                    back={this.openPage("ClosePage")}
                />
                <AdminConfirmed
                    show= {this.state.adminConfirmed}
                    onClose={this.openPage("ClosePage")}
                />
            </div>
        )
    }
}

export default Admin;