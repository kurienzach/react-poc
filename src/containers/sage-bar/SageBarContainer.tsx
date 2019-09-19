
import {connect} from 'react-redux';
import {AppState} from '../../app/store/store';
import SageBar from '../../components/sage-bar/SageBar';
import { removeToken } from './sage-bar-store';

const mapStateToProps = (state: AppState) => {
    return {
        tokens: state.sageBar.tokens,
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    onTokenDelete: (token: string) => dispatch(removeToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SageBar);