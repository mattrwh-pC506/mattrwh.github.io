import * as React from "react";
import { HeaderProps, Header } from "../Header/Header";
import { CollectionProps, Collection } from "../Collection/Collection";
import { ChartProps, Chart } from "../Chart/Chart";
import { StyledBox } from "../StyledBox/StyledBox";

var styles = require("./Main.css");

let headerData: HeaderProps = {
    name: "matthew whitt",
    title: "full-stack engineer",
    city: "los angeles, ca",
    email: "mwhitt.w@gmail.com",
};

let charts: ChartProps[] = [
    { 
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/a95498c7-84c2-4705-8c74-9fa9144f153a.svg",
        isBig: true,
    },
    { 
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/84aa02c1-c080-400d-ba4b-bd685b5ba721.svg", 
        isBig: true,
    },
    { 
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/6aefd448-5e3b-4e93-a9fd-e694049921c5.svg",
        isSmall: true,
    },
    { 
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/1a6b567b-c9f4-4340-814c-a14013c5d655.svg",
        isSmall: true,
    },
];

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
                value: "Disney Projects (NDA)",
                isLink: false,
                isDisabled: true,
            },
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
    {
        headerValue: "Fun Projects",
        items: [
            {
                value: "Battle Drafter",
                isLink: true,
                linkHref: "https://github.com/mattrwh/battledrafter" 
            },
            {
                value: "Python Injectables",
                isLink: true,
                linkHref: "https://github.com/mattrwh/injectables" 
            },
            {
                value: "Krull (Python Rest Framework)",
                isLink: true,
                linkHref: "https://github.com/mattrwh/krull" 
            }
        ]
    },
];

export const Main = () => {
    let collectionComponents = collections.map((props: CollectionProps, i: number) => {
        return <Collection key={props.headerValue + i} { ...props }/>; 
    });

    let bigChartComponents = charts.filter(chart => chart.isBig).map((props: ChartProps, i: number) => {
        return <Chart key={i} { ...props }/>;
    });
    
    let smallChartComponents = charts.filter(chart => chart.isSmall).map((props: ChartProps, i: number) => {
        return <Chart key={i} { ...props }/>;
    });

    return (
        <section className={styles.c_Main}>
            <Header {...headerData} />
            <StyledBox padding={'5px'} margin={'5px'}>
                <section  className={styles.c_Main__Container}>
                    <section className={styles.c_Main__Column}>
                        {collectionComponents}
                        <section className={styles.c_Main__Row}>
                            {smallChartComponents}
                        </section>
                    </section>
                    <section className={styles.c_Main__Column}> {bigChartComponents} </section>
                </section>
                
            </StyledBox>
        </section>
    );
};
