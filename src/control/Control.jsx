import React from "react";
import styles from './Control.module.css'


const Control = (props) => {
    let years = props.data.years.map((v, i) => {
        return <option key={i.toString()} value={v}>{v}</option>
    });
    let months = props.data.months.map((v, i) => {
        return <option key={i.toString()} value={v}>{v}</option>
    });
    return (
        <div>
            <select className={styles.controlSelector} name={'type'} onChange={props.select}>
                <option value={'total'}>Total</option>
                <option value={'byDate'}> By Date</option>
            </select>
            <select className={styles.controlSelector} name={'year'} onChange={props.select}>{years}</select>
            <select className={styles.controlSelector} name={'month'} onChange={props.select}>{months}</select>
        </div>
    )
};

export default Control;