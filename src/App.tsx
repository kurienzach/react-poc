import React from 'react';
import styles from './App.module.css';
import Header from './widgets/header/Header';
import DataSourcesContainer from './containers/data-sources/DataSourcesContainer';
import SageBarContainer from './containers/sage-bar/SageBarContainer';
import { Provider } from 'react-redux';
import {store} from './app/store/store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className={styles.app}>
                <Header />
                <div className={styles.content}>
                    <DataSourcesContainer />
                    <SageBarContainer />
                </div>
            </div>
        </Provider>
    );
}

export default App;
