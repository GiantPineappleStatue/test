import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { put, takeLatest } from 'redux-saga/effects';

export const actionTypes = {
    Login: '[Login] Action',
    Logout: '[Logout] Action',
    Register: '[Register] Action',
    UserRequested: '[Request User] Action',
    UserLoaded: '[Load User] Auth API',
    SidebarCollapse: 'Sidebar Collapse',
    LetsMakeaMovie: 'Lets Make a Movie',
    ChangeUserBacking: 'ChangeUserBacking'
};

const initialAuthState = {
    user: undefined,
    authToken: undefined,
    sidebarCollapse: true,
    letsMakeaMovie: false
};

export const reducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionTypes.Login: {
            return { ...state, user: action.payload.user, authToken: action.payload.authToken };
        }
        case actionTypes.ChangeUserBacking: {
            return {
                ...state,
                user: {
                    ...state.user,
                    backing: {
                        amount: +state.user.backing.amount + +action.payload.amount,
                        tier: action.payload.tier
                    }
                }
            };
        }
        case actionTypes.Register: {
            const { authToken } = action.payload;

            return { authToken, user: undefined };
        }

        case actionTypes.Logout: {
            return {
                ...state,
                user: null,
                authToken: null
            };
        }

        case actionTypes.SidebarCollapse: {
            return {
                ...state,
                sidebarCollapse: action.payload.sidebar
            };
        }

        case actionTypes.UserLoaded: {
            const { user } = action.payload;
            return { ...state, user };
        }

        case actionTypes.LetsMakeaMovie: {
            return {
                ...state,
                letsMakeaMovie: action.payload.movie
            };
        }

        default:
            return state;
    }
};

export const actions = {
    login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
    register: (authToken) => ({
        type: actionTypes.Register,
        payload: { authToken }
    }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: (user) => ({ type: actionTypes.UserRequested, payload: { user } }),
    fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
    sidebarCollapseHandler: (sidebar) => ({
        type: actionTypes.SidebarCollapse,
        payload: { sidebar }
    }),
    letsMakeaMovieHandler: (movie) => ({
        type: actionTypes.LetsMakeaMovie,
        payload: { movie }
    })
};

export const sidebarCollapseHandler = (sidebar) => ({
    type: 'SIDEBAR_COLLAPSE_SAGA',
    payload: { sidebar }
});

export const letsMakeaMovieHandler = (movie) => ({
    type: 'LETS_MAKE_A_MOVIE_SAGA',
    payload: { movie }
});

export const loginUser = (user, authToken) => ({
    type: 'USER_LOGIN_SAGA',
    payload: { user: user, authToken: authToken }
});

export const changeBacking = (amount, tier) => ({
    type: 'USER_BACKING_CHANGE',
    payload: { amount, tier }
});

export const updateUser = (user) => ({
    type: 'UPDATE_USER',
    payload: { user }
});
export const logout = () => ({ type: actionTypes.Logout });
export function* saga() {
    yield takeLatest('UPDATE_USER', function* updateUser(data) {
        yield put({ type: actionTypes.UserLoaded, payload: data.payload });
    });
    yield takeLatest('USER_LOGIN_SAGA', function* loginUser(data) {
        yield put({ type: actionTypes.Login, payload: data.payload });
    });
    yield takeLatest('USER_BACKING_CHANGE', function* changeBacking(data) {
        yield put({ type: actionTypes.ChangeUserBacking, payload: data.payload });
    });

    yield takeLatest('LETS_MAKE_A_MOVIE_SAGA', function* movieHanlder(data) {
        yield put({ type: actionTypes.LetsMakeaMovie, payload: data.payload });
    });

    yield takeLatest('SIDEBAR_COLLAPSE_SAGA', function* loginUser(data) {
        yield put({ type: actionTypes.SidebarCollapse, payload: data.payload });
    });

    yield takeLatest('TEST', function* loginSaga() {
        yield put(actions.requestUser());
    });

    yield takeLatest(actionTypes.Register, function* registerSaga() {
        yield put(actions.requestUser());
    });

    yield takeLatest(actionTypes.UserRequested, function* userRequested() {
        const { data: user } = yield getUserByToken();

        yield put(actions.fulfillUser(user));
    });
}
