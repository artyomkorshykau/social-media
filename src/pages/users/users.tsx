import React, {useEffect} from 'react';
import {Pagination} from "../../common/pagination/pagination";
import {useDispatch} from "react-redux";
import {thunks} from "../../redux/thunks/thunks";
import {Filter} from "../../redux/users-reducer";
import {Preloader} from "../../common/preloader/preloader";
import {useUserData} from "../../utils/hooks/useUserData";
import {UserSearchForm} from "../../components/users/user-search-form";
import {User} from "../../components/users/user";
 const Users = () => {

    const {filter, users, totalUserCount, pageSize, currentPage, isFollowing, isFetching} = useUserData()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunks.getUsers(currentPage, pageSize, filter))
    }, [])
    const onPageChanged = (pageNumber: number) => {
        dispatch(thunks.getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: Filter) => {
        dispatch(thunks.getUsers(1, pageSize, filter))
    }
    const follow = (id: number) => {
        dispatch(thunks.follow(id))
    }
    const unfollow = (id: number) => {
        dispatch(thunks.unFollow(id))
    }

    return (
        <div>
            <UserSearchForm onFilterChanged={onFilterChanged}/>
            <Pagination totalUserCount={totalUserCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}/>
            {isFetching ? <Preloader/> : null}
            {
                users.map((el) => <User followTC={follow}
                                        isFollowing={isFollowing}
                                        unFollowTC={unfollow}
                                        user={el}
                                        key={el.id}/>)
            }
        </div>
    );
};

export default Users;