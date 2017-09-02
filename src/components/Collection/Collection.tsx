import * as React from "react";
var styles = require("./Collection.css");

export interface ItemProps {
    value: string;
    isLink: boolean; 
    linkHref?: string;
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
        <h1 className={styles.c_Collection_Header_Box}>
            {headerProps.headerValue}
        </h1>
    );
};

export const CollectionItem = (itemProps: ItemProps) => {
    if (itemProps.isLink) {
        return <a href={itemProps.linkHref}><span>{itemProps.value}</span></a>;
    } else {
        return <span>{itemProps.value}</span>;
    }
};

export const CollectionItemBox = (itemProps: ItemProps) => {
    return (
        <div className={styles.c_Collection_Item_Box}>
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
