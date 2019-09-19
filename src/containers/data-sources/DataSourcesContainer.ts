import {connect} from 'react-redux';
import {AppState} from '../../app/store/store';
import DataSources from '../../components/data-sources/DataSources';
import {loadSources} from './data-sources-store';
import {addToken} from '../sage-bar/sage-bar-store';

const mapStateToProps = (state: AppState) => {
    return {
        isLoading: state.dataSources.loading,
        items: state.dataSources.sources.map(source => ({
            id: source.id,
            text: source.name,
            subItems: source.columns,
        })),
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    getSources: () => dispatch(loadSources()),
    onColumnDblClick: (item: string) => dispatch(addToken(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSources);