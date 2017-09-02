import * as React from "react";
import { HeaderProps, Header } from "../Header/Header";
import { CollectionProps, Collection } from "../Collection/Collection";
import { StyledBox } from "../StyledBox/StyledBox";

var styles = require("./Main.css");

let headerData: HeaderProps = {
    name: "matthew whitt",
    title: "full-stack engineer",
    city: "los angeles, ca",
    email: "mwhitt.w@gmail.com",
};

let collections: CollectionProps[] = [
    {
        headerValue: "About Me",
        items: [
            {
                value: "I solve difficult problems at scale, and implement robust microservices architectures", 
                isLink: false
            },
            {
                value: "I integrate 3rd party APIs through robust defensive programming techniques", 
                isLink: false
            },
            {
                value: "I always automate development and tests, instrument monitoring, and engage in continuous deployment.", 
                isLink: false
            },
            {
                value: "I excel at constructing smart and sane object oriented abstraction.", 
                isLink: false
            },
            {
                value: "I am always a champion of code quality, I engage in frequent peer reviews, and strive to never compromise", 
                isLink: false
            },
            {
                value: "I follow modern web standards (RESTful APIS, OAuth, SPA, progressive web, and JWT)", 
                isLink: false
            },
        ]
    },
    {
        headerValue: "Work Projects",
        items: [
            {
                value: "Apploi",
                isLink: true,
                linkHref: "https://jobs.apploi.com/search" 
            },
            {
                value: "Beginning with Children",
                isLink: true,
                linkHref: "http://www.beginningwithchildren.org/" 
            }
        ]
    },
];

export const Main = () => {
    let collectionComponents = collections.map((props: CollectionProps, i: number) => {
        return (
            <div key={props.headerValue + i}>
                <Collection { ...props }/>
            </div>
        );
    });
    return (
        <section className={styles.c_Main}>
            <Header {...headerData} />
            <StyledBox padding={'5px'} margin={'5px'}>
                <section  className={styles.c_Main__Container}>
                    {collectionComponents}
                </section>
            </StyledBox>
        </section>
    );
};
