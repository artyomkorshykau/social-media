import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer, {DialogsActionType} from "./dialogs-reducer";
import profileReducer, {ProfileActionType} from "./profile-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import usersReducer, {UsersActionType} from "./users-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {reducer as formReducer, stopSubmit} from 'redux-form'
import appReducer, {InitializedActionType} from "./app-reducer";


let rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer, applyMiddleware(thunk))
export type StoreReduxType = typeof store
export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>
export type AppThunk = ThunkAction<Promise<void>, AppStateType, unknown, AppActionType>
export type AppActionType =
    | AuthActionType
    | DialogsActionType
    | ProfileActionType
    | UsersActionType
    | ReturnType<typeof stopSubmit>
    | InitializedActionType

// @ts-ignore
window.store = store