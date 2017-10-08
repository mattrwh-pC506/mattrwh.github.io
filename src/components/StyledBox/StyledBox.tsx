import * as React from "react";
import * as ReactDOM from "react-dom";


export const StyledBox = (props: any) => {
    let styles: any = {}; 
    props.padding ? styles.padding = props.padding : undefined;
    props.margin ? styles.margin = props.margin : undefined;

    return <section style={styles}>{props.children}</section>;
};
