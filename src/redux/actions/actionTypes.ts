export enum ACTIONS_TYPE {
    SET_INITIALIZED = 'APP/SET_INITIALIZED',

    SET_USER_DATA = 'AUTH/SET_USER_DATA',
    SEND_MESSAGE = 'DIALOGS/SEND-MESSAGE',

    ADD_POST = 'PROFILE/ADD-POST',
    SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE',
    SET_STATUS = 'PROFILE/SET-STATUS',

    FOLLOW = 'USERS/FOLLOW',
    UNFOLLOW = 'PROFILE/UNFOLLOW',
    SET_USER = 'USERS/SET_USER',
    SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE',
    SET_TOTAL_USER_COUNT = 'USERS/SET_TOTAL_USER_COUNT',
    IS_FETCHING = 'USERS/IS_FETCHING',
    IS_FOLLOWING = 'USERS/IS_FOLLOWING'
}