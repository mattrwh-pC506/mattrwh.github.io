import * as React from "react";
import * as ReactDOM from "react-dom";
var styles = require("./Collection.css");

export interface ItemProps {
    value: string;
    isLink: boolean; 
    linkHref?: string;
    isDisabled?: boolean;
}

export interface CollectionProps { 
    items: ItemProps[];
    headerValue: string;
}

export interface CollectionHeader {
    headerValue: string;
};

export const CollectionHeader = (headerProps: CollectionHeader) => {
    return (
        <h3 className={styles.c_Collection_Header__Box}>
            {headerProps.headerValue}
        </h3>
    );
};

export const CollectionItem = (itemProps: ItemProps) => {
    if (itemProps.isLink) {
        return <a href={itemProps.linkHref}><span>{itemProps.value}</span></a>;
    } else {
        return <span className={itemProps.isDisabled ? styles.c_Collection_Item__Box___Disabled : null}>{itemProps.value}</span>;
    }
};

export const CollectionItemBox = (itemProps: ItemProps) => {
    return (
        <div className={itemProps.isLink ? styles.c_Collection_Item__Link : styles.c_Collection_Item__Box}>
            <CollectionItem {...itemProps}/>
        </div>
    );
};


export const Collection = (props: CollectionProps) => {
    let items = props.items.map((itemProps: any, index: number) => {
        return <div key={index}><CollectionItemBox {...itemProps}/></div>;
    });
    return (
        <section className={styles.c_Collection}>
            <CollectionHeader  headerValue={props.headerValue} />
            <div>{ items }</div>
        </section>
    );
};
