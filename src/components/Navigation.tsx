import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/slices/authSlice';



const Navigation = () => {
    const { isAuth, username } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        dispatch((authSlice.actions.logout()));
        navigate('/auth');

    }
    return (
        <nav className="flex justify-between w-full items-center drop-shadow h-[50px] px-5 bg-gray-100">
            <h3><Link to={'/'}>Airports</Link></h3>

            <div>
                {
                    !isAuth
                        ? <Link to={'/auth'}>Auth</Link>
                        : <>
                            <span className="font-bold mr-4">Hello, {username}</span>
                            <a href="#" onClick={logoutHandler}>Logout</a>
                        </>
                }
            </div>
        </nav>
    );
};

export default Navigation;
