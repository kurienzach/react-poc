import { ThunkAction } from 'redux-thunk';
import {getTables} from './data-sources-service';

/***************************
 * STORE DATA TYPES
 ***************************/
interface Source {
    id: number;
    name: string;
    columns: string[];
    isOpen?: boolean;
}

interface DataSourceState {
    loading: boolean;
    sources: Source[];
}

const InitialState: DataSourceState = {
    loading: false,
    sources: [],
};

/***************************
 * ACTIONS
 ***************************/
const LOAD_SOURCES_REQUEST = 'LOAD_SOURCES_REQUEST';
const LOAD_SOURCES_SUCCESS = 'LOAD_SOURCES_SUCESS';
const LOAD_SOURCES_FAILURE = 'LOAD_SOURCES_FAILURE';
const SHOW_DATA_SOURCES_LOADING = 'SHOW_DATA_SOURCES_LOADING';
const HIDE_DATA_SOURCES_LOADING = 'HIDE_DATA_SOURCES_LOADING';
const TOGGLE_DATA_SOURCE_OPEN = 'TOGGLE_DATA_SOURCE_OPEN';

/***************************
 * ACTION CREATOR TYPES
 ***************************/
interface LoadSourcesRequestAction {
    type: typeof LOAD_SOURCES_REQUEST;
}

interface LoadSourcesSucessAction {
    type: typeof LOAD_SOURCES_SUCCESS;
    sources: Source[];
}

interface LoadSourcesFailureAction {
    type: typeof LOAD_SOURCES_FAILURE;
}

interface ShowDataSourcesLoadingAction {
    type: typeof SHOW_DATA_SOURCES_LOADING;
}

interface HideDataSourcesLoadingAction {
    type: typeof HIDE_DATA_SOURCES_LOADING;
}

interface ToggleDataSourceAction {
    type: typeof TOGGLE_DATA_SOURCE_OPEN;
    source: Source;
}

export type DataSourceActions = LoadSourcesRequestAction |
    LoadSourcesSucessAction |
    LoadSourcesFailureAction | 
    ShowDataSourcesLoadingAction |
    HideDataSourcesLoadingAction | 
    ToggleDataSourceAction;

/***************************
 * ACTION CREATORS
 ***************************/
export const loadSources = (): ThunkAction<void, DataSourceState, undefined, DataSourceActions> => 
dispatch => {
    dispatch(showDataSourcesLoading());
    getTables()
        .then(data => dispatch(loadSourcesSuccess(data)))
        .catch(error => dispatch(loadSourcesFailure()))
}

const loadSourcesSuccess = (sources: Source[]): LoadSourcesSucessAction => ({
    type: LOAD_SOURCES_SUCCESS,
    sources
});

const loadSourcesFailure = (): LoadSourcesFailureAction => ({
    type: LOAD_SOURCES_FAILURE,
});

const showDataSourcesLoading = (): ShowDataSourcesLoadingAction => ({
    type: 'SHOW_DATA_SOURCES_LOADING',
});

export const toggleDataSourceOpen = (source: Source) => ({
    type: 'TOGGLE_DATA_SOURCE_OPEN',
    source,
})

/***************************
 * REDUCER
 ***************************/
export const dataSourcesReducer = (state = InitialState, action: DataSourceActions) => {
    switch(action.type) {
        case 'LOAD_SOURCES_SUCESS':
            return {
                ...state,
                loading: false,
                sources: action.sources,
            };
        case 'LOAD_SOURCES_FAILURE':
            return {
                ...state,
                loading: false,
            };
        case 'SHOW_DATA_SOURCES_LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'HIDE_DATA_SOURCES_LOADING':
            return {
                ...state,
                loading: false,
            }
        case 'TOGGLE_DATA_SOURCE_OPEN':
            return {
                ...state,
                sources: state.sources.map(source => {
                    if (source.id === action.source.id) {
                        return {
                            ...source,
                            isOpen: !source.isOpen,
                        }
                    }
                    return source;
                }),
            }
        default:
            return state;
    }
}