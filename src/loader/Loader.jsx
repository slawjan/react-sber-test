import React from "react";
import styles from './Loader.module.css'

const Loader = ()=>{
    return (
        <div className={styles.loader}>
            <div className={'lds-ring'}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={styles.ldsInfo}>Data loading from https://data.mos.ru/</div>
        </div>
    )
}


export default Loader