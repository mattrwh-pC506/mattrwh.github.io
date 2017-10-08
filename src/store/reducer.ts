import { Action } from "redux";
import { StateProps } from "./state.type";


// types

type State<T> = {
    readonly [id: string]: T;
};

// actions

const actionTypes = {
    dataFetched: stateProp => `${stateProp}/DATA_FETCHED`,
};

// action creators

const actionCreators = {
    fetchData: stateProp => <T>(data: ReadonlyArray<T>) => ({
        type: actionTypes.dataFetched(stateProp),
        payload: { data },
    }),
};

//--------------------------------
// SELECTORS
//--------------------------------

const selectors = {
    data: stateKey => <T>(state: any): State<T> => state[stateKey],
    id: stateKey => <T>(state: any) => (id: string): T => state[stateKey][id],
};
