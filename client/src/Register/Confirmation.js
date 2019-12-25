import React, {Component} from 'react';
import styles from "./register.module.sass"
import { Link } from "react-router-dom";

class Confirmation extends Component{

    render(){
        if (!this.props.show){
            return null;
        }
        return(
            <div>
                <div className={ styles.blur}></div>
                <div className={ styles.confirmation}> JOIN US
                    <div className={ styles.confirmTxt}>Confirmed</div>
                    <div className={ styles.confirmContact}>We will be in contact with you</div>
                    <Link to="Default">
                        <button className={ styles.confirmButton}>
                            <div className={ styles.confirmImg}></div>
                        </button>
                    </Link>     
                </div>
            </div>
        )
    }
}

export default Confirmation;