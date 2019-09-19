
/***************************
 * STORE DATA TYPES
 ***************************/
interface SageBarState {
    tokens: string[];
}

const InitialState: SageBarState = {
    tokens: [],
};

/***************************
 * ACTIONS
 ***************************/
const ADD_TOKEN = 'ADD_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

/***************************
 * ACTION CREATOR TYPES
 ***************************/
interface AddTokenAction {
    type: typeof ADD_TOKEN;
    token: string;
}

interface RemoveTokenAction {
    type: typeof REMOVE_TOKEN;
    token: string;
}

export type SageBarActions = AddTokenAction |
    RemoveTokenAction;

/***************************
 * ACTION CREATORS
 ***************************/
export const addToken = (token: string) => ({
    type: 'ADD_TOKEN',
    token,
});

export const removeToken = (token: string) => ({
    type: 'REMOVE_TOKEN',
    token,
});

/***************************
 * REDUCER
 ***************************/
export const sageBarReducer = (state = InitialState, action: SageBarActions) => {
    switch(action.type) {
        case 'ADD_TOKEN':
            return {
                ...state,
                tokens: [...state.tokens, action.token]
            }
        case 'REMOVE_TOKEN':
            return {
                ...state,
                tokens: state.tokens.filter(token => token !== action.token),
            }
        default:
            return state;
    }
}