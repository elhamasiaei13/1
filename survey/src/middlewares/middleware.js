import * as types from '../actions/actionTypes';

// export const apiGenericErrorMiddleware = store => next => action => {
//     console.log('Here is apiGenericErrorMiddleware and action is: ' + action.type);
//     const SUPPORTED_ERR_CODES = [500, 404, 403, 401];

//     if (action.payload && action.payload.err) {

//         const { status } = action.payload.err;

//         SUPPORTED_ERR_CODES.forEach(code => {
//             if (status === code) {
//                 store.dispatch({
//                     type: types.API_GENERIC_ERR_OCCURRED,
//                     payload: action.payload.err
//                 })
//                 //return;
//             }
//         })
//     }
//     next(action);
// }

export const apiAuthErrorMiddleware = store => next => action => {

    const ERR_CODE = "401";

    if (action.payload && action.payload.err) {

        const { status } = action.payload.err;

        if (status == ERR_CODE) {
            store.dispatch({
                type: types.API_UNAUTHENTICATED_ERR_OCCURRED,
                //payload: action.payload.err
            })
            //return;
        }

    }
    next(action);
}