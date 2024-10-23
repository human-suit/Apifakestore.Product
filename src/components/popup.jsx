import React, { useEffect, useState } from "react";
import styles from '../styles/main.module.css'
import { useLocation, useNavigate } from "react-router-dom";

//Popup


const Popup = props => {
    return (
      <div className={styles.popupBox}>
        <div className={styles.box}>
          <span className={styles.closeIcon} onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };
   
  export default Popup;