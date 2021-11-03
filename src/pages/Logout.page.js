/* eslint-disable */
import {useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from 'UserContext';

export default function Logout(){
    const { setUser } = useContext(UserContext);
    localStorage.clear();
    useEffect(() => {
        setUser(null)
    }, [])

    return (
        <Redirect to="/login"/>
    )
}