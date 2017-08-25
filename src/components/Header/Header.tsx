import * as React from "react";
var styles = require("./Header.css");


export interface HeaderProps { 
    name: string;
    title: string;
    city: string;
    email: string;
}

export const Header = (props: HeaderProps) => ( 
    <section>
        <div className={
            `${styles.c_Header} ${styles.c_Header_Main} ${styles.c_Header__Darker}`}>
            {props.name}
        </div>
        <div className={
            `${styles.c_Header} ${styles.c_Header_Sub} ${styles.c_Header__Lighter}`}>
            <span className={styles.c_Header_Sub__Text}>{props.title}</span>
            <span className={styles.c_Header_Sub__Text}>- {props.city} -</span>
            <span className={styles.c_Header_Sub__Text}>{props.email}</span>
        </div>
    </section>
);
