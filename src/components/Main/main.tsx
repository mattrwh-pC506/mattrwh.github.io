import * as React from "react";
import { HeaderProps, Header } from "../Header/Header";

var styles = require("./Main.css");

let headerData = {
    name: "matthew whitt",
    title: "full-stack engineer",
    city: "los angeles, ca",
    email: "mwhitt.w@gmail.com",
};

export const Main = () => ( 
    <section className={styles.c_Main}>
        <Header {...headerData} />
    </section>
);
