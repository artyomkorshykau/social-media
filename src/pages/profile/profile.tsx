import React, {useEffect} from "react";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useProfileData} from "../../utils/hooks/useProfileData";
import {thunks} from "../../redux/thunks/thunks";
import ProfileInfo from "../../components/profile-info/profile-info";
import MyPost from "./MyPosts/my-post";
import {getIsAuth} from "../../utils/selectors/auth-selectors/auth-selectors";

const Profile = () => {


    const {userId} = useParams<{ userId: string }>();
    const history = useHistory();
    const dispatch = useDispatch();

    const {loggedUser} = useProfileData()

    const refreshProfile = () => {
        let userID = userId;

        if (!userID) {
            userID = !userID ? '29875' : String(loggedUser);
            if (!userID) {
                history.push('/login');
            }
        }

        dispatch(thunks.getProfile(+userID));
        dispatch(thunks.getUserStatus(userID));
    };

    useEffect(() => {
        refreshProfile();
    }, [userId]);

    return (<div>
        <ProfileInfo isOwner={!userId}/>
        <MyPost/>
    </div>)
}

export default Profile

export type ProfilePhoto = {
    small: string | null
    large: string | null
}

export type ProfileContacts = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}