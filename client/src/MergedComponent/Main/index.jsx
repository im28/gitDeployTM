import React, { useState } from 'react';
import { Link ,Route,BrowserRouter } from "react-router-dom";
import Bg from "./Bg";
import Profil from "./Profil/Profil";
import Summary from "./Summary/Summary";

import Admin from "./Admin/Admin";
import Search from "./Admin/SearchMember";
import {getIP} from "../../ipAddressPic";



import classnames from "classnames";
import styles from "../MiniComponents/miniComponents.module.sass"
import "./Side.sass"
import "../MiniComponents/common.sass"
import Cookies from "js-cookie";

// let colors=["#772432","#004165","#CD202C","#F2DF74"]
// let colorname=["TMpurple","TMblue","TMred","TMyellow","TMgray"]

let tab1=[true,false,false,false]
let tab2=[false,true,false,false]
let tab3=[false,false,true,false]
let tab4=[false,false,false,true]
let all =[tab1,tab2,tab3,tab4]

let select =[-150,-50,50,150]
// let admin = true;
let h = [-150,-54,35,130]


const Index = (props) => {
  const isAdmin = JSON.parse(Cookies.get("isAdmin"))
  console.log(props.match.params.id);
  let arraya = isAdmin ? h : select;
  let tabTouse = arraya[1];
  let tabTouse1 = tab2;
  console.log(props);
  

  if (props.match.params.id === "Admin") {
    tabTouse=arraya[3];
    tabTouse1 = tab4;
  }
  else if (props.match.params.id === "Profile") {
    tabTouse=arraya[0];
    tabTouse1 = tab1;
  }
  else if (props.match.params.id === "Summary") {
    tabTouse=arraya[2];
    tabTouse1 = tab3;
  }
   
  const id = Cookies.get("userId");
  const [tab, setTab] = useState(tabTouse1);
  const [admin] = useState(isAdmin);
  const [selectPos, setselectPos] = useState(tabTouse);
  const [imageLocation] = useState(`url(${getIP()}/pics/${id}.jpg)`);
  // const isAdmin = JSON.parse(Cookies.get("isAdmin"))
  function handleTab(tabNo) {
    setTab(all[tabNo]);
    if (admin) 
      setselectPos(h[tabNo])
    else
      setselectPos(select[tabNo])
  }

  let styleSelect={}
  let styleNavigator={}
  if (admin) {
    styleSelect={
      transform: `translate(0%,${selectPos}%)`,
      top:"40.5%"}
    styleNavigator={ top:"40.5%"}
  }
  else
    styleSelect={ transform: `translate(0%,${selectPos}%)` }
    
  console.log(props.match.params.id);
  
  return (
    <BrowserRouter>
      <div id="mainContent" 
      className={classnames( styles.side)}
      >
        
        
        <div className={"navigator_select"} style={styleSelect}/>
        <div className={"navigator"}  style={styleNavigator}>
          <Link to="/Main/Profile">
            <div onClick={()=>(handleTab(0)) } 
            className={classnames(tab[0] && "selectedProfile" ,"navigator_icon","profile_select")} style={{backgroundImage:imageLocation}}>
              <p style={{fontSize:"2vmin"}} className={"navigator_tag"}>Profile</p>
            </div>
          </Link>
          <Link to="/Main">
          <div onClick={()=>(handleTab(1))} 
          className={classnames(tab[1] ? "TMblue" : "gray","navigator_icon")}>
            <i className="fas fa-calendar-alt"></i>
            <p style={{fontSize:"2vmin"}} className={"navigator_tag"}>Next Week</p>
          </div>
          </Link>
          <Link to="/Main/Summary" style={{textDecoration:"none"}}>
          <div onClick={()=>(handleTab(2))} className={classnames(tab[2] ? "TMblue" : "gray","navigator_icon")}>
            <i className="fas fa-book-open"></i>
            <p style={{fontSize:"2vmin"}} className={"navigator_tag"}>Summary</p>
          </div>
          </Link>
          {
            admin ?
            <Link to="/Main/Admin" style={{textDecoration:"none"}}>
            <div onClick={()=>(handleTab(3))} className={classnames(tab[3] ? "TMblue" : "gray","navigator_icon")}>
              <i className="fas fa-user-cog"></i>
              <p style={{fontSize:"2vmin"}} className={"navigator_tag"}>Admin</p>
            </div>
            </Link>
            : ""
          }
        </div>

          <Route exact path='/Main/Profile' component={Profil} />
          <Route exact path='/Main' component={Bg} />
          <Route path='/Main/Summary' component={Summary} />
          { admin ? <Route path='/Main/Admin' component={Admin} /> : ""}
          { admin ? <Route path='/Main/Admin/Search' component={Search} />: ""}
      </div>
    </BrowserRouter>
  );
}

export default Index;