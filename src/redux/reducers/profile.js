import * as actions from '../actionTypes';

const initialState = {
    profileUser: {
        user: { featured_2d3d: [], featured_audio: [], featured_video: [], created_at: '' },
        rating: 0
    },
    selectedSubscription: null,
    subscriptions: [],
    paymentStatus: false,
    planDuration: '1',
    referralDialog: false
};
const copyState = { ...initialState };
const profile = (state = initialState, action) => {
    switch (action.type) {
        case actions.PROFILE_USER:
            return {
                ...state,
                profileUser: action.user,
                subscriptions: action.user.user.subscriptions
            };
        case actions.PROFILE_FEATURED_VIDEO:
            return {
                ...state,
                profileUser: {
                    ...state.profileUser,
                    user: {
                        ...state.profileUser.user,
                        featured_video: action.videos
                    }
                }
            };
        case actions.PROFILLE_FEATURED_IMAGES:
            return {
                ...state,
                profileUser: {
                    ...state.profileUser,
                    user: {
                        ...state.profileUser.user,
                        featured_2d3d: action.images
                    }
                }
            };

        case actions.PROFILLE_FEATURED_AUDIOS:
            return {
                ...state,
                profileUser: {
                    ...state.profileUser,
                    user: {
                        ...state.profileUser.user,
                        featured_audio: action.audios
                    }
                }
            };
        case actions.PROFILE_SUBSCRIPTION_CHANGE:
            return {
                ...state,
                selectedSubscription: action.subscription
            };
        case actions.ADD_SUBSCRIPTION:
            return {
                ...state,
                subscriptions: [
                    ...state.subscriptions,
                    { price: '', month: '1', title: '', desc: '', edit: false }
                ]
            };
        case actions.REMOVE_SUBSCRIPTION:
            const updateSubscription = [...state.subscriptions];
            updateSubscription.splice(action.index, 1);
            return {
                ...state,
                subscriptions: updateSubscription
            };
        case actions.HANDLE_SUBSCRIPTION_EDIT:
            const editSubsc = [...state.subscriptions];
            editSubsc[action.index]['edit'] = action.edit;
            return {
                ...state,
                subscriptions: editSubsc
            };
        case actions.HANDLE_SUBSCRIPTION_CHANGE:
            const { name, value } = action.e.target;
            const updateSubsc = [...state.subscriptions];
            updateSubsc[name.split('-')[1]][name.split('-')[0]] = value;
            return {
                ...state,
                subscriptions: updateSubsc
            };
        case actions.PAYMENT_STATUS:
            return {
                ...state,
                paymentStatus: action.value,
                planDuration: '1'
            };
        case actions.PLAN_DURATION_CHANGE:
            return {
                ...state,
                planDuration: action.value
            };
        case actions.PROFILE_CLEAN:
            return copyState;
        case actions.PROFILE_REFERRAL:
            return {
                ...state,
                referralDialog: action.value
            };
        default:
            return state;
    }
};

export default profile;
