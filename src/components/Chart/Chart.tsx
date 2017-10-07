import * as React from "react";
var styles = require("./Chart.css");


export interface ChartProps { 
    src: string;
    isBig?: boolean;
    isSmall?: boolean;
}

export const Chart = (props: ChartProps) => ( 
    <section className={props.isBig ? styles.c_Chart__Box : styles.c_Chart__Box___Row}>
    <figure><embed src={props.src}></embed></figure>
    </section>
);
