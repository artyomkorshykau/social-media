import {
    follow, initializedSucceed,
    setAuthUserData, setCaptcha, setPage, setPhotoSuccess, setStatusAC,
    setTotalUserCount, setUser,
    setUserProfile,
    toggleIsFetching,
    toggleIsFollowing, unfollow
} from "../actions/actions";
import {authAPI, profileAPI, securityAPI, usersAPI, UserType} from "../../api/social-network-api";
import {stopSubmit} from "redux-form";
import {AppRootState, AppThunk} from "../store";
import {ProfileUserType} from "../../components/Profile/ProfileContainer";

//-------------------------------APP-THUNK-------------------------------
export const initializedTC = (): AppThunk => {
    return async (dispatch) => {
        const res = dispatch(authMeTC())
        Promise.all([res])
            .then(() => {
                dispatch(initializedSucceed())
            })
    };
};

//-------------------------------AUTH-THUNK-------------------------------
export const authMeTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await authAPI.authMe();
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, login, email, true));
            }
        } catch (error) {
            // Handle error
        }
    };
};

export const LoginTC = (log: string, pass: string, remember: boolean, captcha: string | null): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await authAPI.login(log, pass, captcha, remember);
            if (res.data.resultCode === 0) {
                await dispatch(authMeTC());
            } else {
                if (res.data.resultCode === 10) {
                    dispatch(getCaptchaTC())
                }
                let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some Error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        } catch (error) {
            // Handle error
        }
    };
};

export const LogoutTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await authAPI.logout();
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            // Handle error
        }
    };
};

export const getCaptchaTC = (): AppThunk => {
    return async (dispatch) => {
        const res = await securityAPI.getCaptcha()
        dispatch(setCaptcha(res.data.url))
    }
}

//--------------------------------PROFILE-THUNK--------------------------------
export const getProfileTC = (userID: number | null = 29875): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.getProfile(userID);
            dispatch(setUserProfile(data.data));
        } catch (error) {
            // Handle error
        }
    };
};

export const getUserStatusTC = (userId: string): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await profileAPI.getStatus(userId);
            dispatch(setStatusAC(res.data));
        } catch (error) {
            // Handle error
        }
    };
};

export const updateStatusTC = (status: string): AppThunk => {
    return async (dispatch) => {
        try {
            await profileAPI.updateStatus(status);
            dispatch(setStatusAC(status));
        } catch (error) {
            // Handle error
        }
    };
};

export const savePhotoTC = (file: File): AppThunk => {
    return async (dispatch) => {
        let res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            dispatch(setPhotoSuccess(res.data.data))
        }
    }
}

export const saveProfileTC = (profile: ProfileUserType): AppThunk => {
    return async (dispatch, getState) => {
        const userId = getState().profilePage.profile?.userId
        let res = await profileAPI.saveProfile(profile)
        if (res.data.resultCode === 0) {
            await dispatch(getProfileTC(userId))
            return Promise.resolve()
        } else if (res.data.resultCode === 1) {
            const errorMessage = res.data.messages[0].split(' ')
            const contactError = errorMessage[errorMessage.length - 1].split('->')
            const contact = contactError[contactError.length - 1].slice(0, -1).toLowerCase()
            dispatch(stopSubmit('Contacts', {'contacts': {[contact]: res.data.messages[0]}}))
            return Promise.reject(res.data.messages[0])
        }
    }
}

//------------------------------USERS-THUNK------------------------------
export const getUsersTC = (currentPage: number, pageSize: number, users: UserType[]): AppThunk => {
    return async (dispatch) => {
        if (users.length === 0) {
            dispatch(toggleIsFetching(true));
            try {
                const data = await usersAPI.getUsers(currentPage, pageSize);
                dispatch(setUser(data.items));
                dispatch(toggleIsFetching(false));
                dispatch(setTotalUserCount(data.totalCount));
            } catch (error) {
                // Handle error
            }
        }
    };
};

export const pageChangedTC = (pageNumber: number, pageSize: number): AppThunk => {
    return async (dispatch) => {
        dispatch(setPage(pageNumber));
        dispatch(toggleIsFetching(true));
        try {
            const data = await usersAPI.getUsers(pageNumber, pageSize);
            dispatch(setUser(data.items));
            dispatch(toggleIsFetching(false));
        } catch (error) {
            // Handle error
        }
    };
};

export const followTC = (id: number): AppThunk => {
    return async (dispatch) => {
        dispatch(toggleIsFollowing(true, id));
        try {
            const data = await usersAPI.follow(id);
            if (data.resultCode === 0) {
                dispatch(follow(id));
            }
            dispatch(toggleIsFollowing(false, id));
        } catch (error) {
            // Handle error
        }
    };
};

export const unFollowTC = (id: number): AppThunk => {
    return async (dispatch) => {
        dispatch(toggleIsFollowing(true, id));
        try {
            const data = await usersAPI.unfollow(id);
            if (data.resultCode === 0) {
                dispatch(unfollow(id));
            }
            dispatch(toggleIsFollowing(false, id));
        } catch (error) {
            // Handle error
        }
    };
};

