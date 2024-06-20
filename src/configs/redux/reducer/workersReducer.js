const initialState = {
    talent: [],
    params: {
        limit: 10,
        page: 1,
        search: ''
    },
    searchInput: '',
    selectedSort: '',
};

const workersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WORKERS_REQUEST':
            return {
                ...state,
            };
        case 'GET_WORKERS_SUCCESS':
            return {
                ...state,
                talent: action.payload,
            };
        case 'GET_WORKERS_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'PREVIOUS_PAGE':
            return {
                ...state,
                params: {
                    ...state.params,
                    page: Math.max(1, state.params.page - 1),
                },
            };
        case 'NEXT_PAGE':
            return {
                ...state,
                params: {
                    ...state.params,
                    page: state.params.page + 1,
                },
            };
        case 'SET_SEARCH':
            return {
                ...state,
                params: {
                    ...state.params,
                    search: action.payload,
                },
            };
        case 'SET_SORT': // New case for handling sort
            return {
                ...state,
                selectedSort: action.payload,
            };
        default:
            return state;
    }
};

export default workersReducer;