import React from 'react';
import { Alert, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';

const GenericError = props => {

    const { err } = props;
    const {
        message,
        status,
        // timestamp,
        // error,
        // path 
    } = err;
    if (status == '401') {
        return null;
    }
    
    return (
        <div>
            <PageHeader>
                {/* <small>
                         <span className="danger glyphicon glyphicon-warning-sign" ></span>
                    </small> */}
                <i className="fa fa-warning text-red"></i>
                &nbsp;خطا
            </PageHeader>
            <Alert bsStyle="danger" >
                <h2>
                    <strong>{status}.</strong>&ensp;
                    {/* {error} */}
                </h2>
                <p>{message}</p>
            </Alert>
        </div>
    );
};

GenericError.propTypes = {
    err: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    status: PropTypes.number,
    timestamp: PropTypes.number.isRequired,
    // error: PropTypes.string.isRequired,
};

export default GenericError;
// class GenericError extends Component {

//     render() {
//         const { genericError } = this.props;
//         const { message, status, timestamp, error, path } = genericError;

//         return (
//             <div>
//                 <PageHeader>
//                     <small><span className="danger glyphicon glyphicon-warning-sign" ></span></small>&nbsp;Error
//                 </PageHeader>
//                 <Alert bsStyle="danger" >
//                     <h2>
//                         <strong>{status}.</strong>&ensp;{error}
//                     </h2>
//                     <p>{message}</p>                    
//                 </Alert>
//             </div>
//             // <div>
//             //     {error}
//             //     <br/>
//             //     {timestamp}
//             //     <br/>
//             //     {status}
//             //     <br/>
//             //     {message}
//             //     <br/>
//             // </div>
//         );
//     }
//     componentDidUpdate(prevProps, prevState) {
//         console.log('GenericError componentDidUpdate');
//     }

//     componentWillUnmount() {
//         console.log('GenericError componentWillUnmount');
//         const { actions } = this.props;
//         actions.destroyGenericError();
//     }
// }

// function mapStateToProps(state) {
//     const { genericError } = state.app;
//     return {
//         genericError
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({ destroyGenericError }, dispatch)
//     };
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(GenericError);