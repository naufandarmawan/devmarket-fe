import api from '../../api'

export const getWorkers = (params) => (dispatch) => {
    dispatch({ type: 'GET_WORKERS_REQUEST' });

    api.get('/workers/', {
        params: {
            limit: params.limit,
            page: params.page,
            ...(params.search ? { search: params.search } : {}),
            ...(params.sort ? { sort: params.sort } : {}),
            sortBy: params.sortBy,
        }
    })
        .then((res) => {
            const result = res.data.data
            dispatch({ type: 'GET_WORKERS_SUCCESS', payload: result })
        })
        .catch((err) => {
            dispatch({ type: 'GET_WORKERS_FAILURE', payload: err.response })
            console.log(err.response);
        })
};

export const previous = () => {
    return { type: 'PREVIOUS_PAGE' }
}

export const next = () => {
    return { type: 'NEXT_PAGE' }
}