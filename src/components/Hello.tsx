import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export const helloStyles = {
    color: "red"
}

export const Hello = (props: HelloProps) => {
    return <h1 style={helloStyles}>Hello from {props.compiler} and {props.framework}!</h1>
}
