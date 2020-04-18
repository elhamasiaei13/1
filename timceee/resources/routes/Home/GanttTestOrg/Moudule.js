const INDEX_GANTT_SUCCESS = 'INDEX_GANTT_SUCCESS';
const SHOW_GANTT_SUCCESS = 'SHOW_GANTT_SUCCESS';


function _indexSuccess(payload) {
    return {
        type: INDEX_GANTT_SUCCESS,
        payload: payload,
    };
}

function _showSuccess(payload) {
    return {
        type: SHOW_GANTT_SUCCESS,
        payload: payload.data,
    };
}

export function index(params = {}, callback = () => {
}) {
    return (dispatch, gs, api) => {
        api.get('/ta/clockings', {params})
            .then((res) => {
                dispatch(_indexSuccess(res));
                callback(undefined, res);
            })
            .catch((err) => {
                callback(err);
            });

    };
}

export function show(clocking, callback = () => {
}) {
    return (dispatch, gs, api) => {
        api.get(`/ta/Gantt/${clocking}`, {
            params: {
                includes: ['type'],
            },
        })
            .then((res) => {
                dispatch(_showSuccess(res));
                callback(undefined, res);
            })
            .catch((err) => {
                callback(err);
            });
    };
}


export default function reducer(state = {
    clockings: [],
    clocking: {},
    meta: {},
}, action) {
    let clockings;

    switch (action.type) {
        case
        INDEX_GANTT_SUCCESS:
            clockings = action.payload.data.clockings;
            return Object.assign({}, state, {
                clockings,
                meta: action.payload.meta,
            });
        case
        SHOW_GANTT_SUCCESS:
            return Object.assign({}, state, {
                clocking: action.payload.clocking,
            });


        default:
            return state;
    }
}