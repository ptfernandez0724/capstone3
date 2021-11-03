/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable */
import {UserContext, UserProvider} from 'UserContext';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from 'pages/Home.page';
import LoginPage from 'pages/Login.page';
import Navbar from 'components/Navbar.component';
import RegisterPage from 'pages/Register.page';
import Wishlist from 'pages/Wishlist.component';
import Inquiries from 'pages/Inquiries.page';
import Logout from 'pages/Logout.page';
import AdminPage from 'pages/Admin.page'

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("rendered")
        if (localStorage.getItem('accessToken')) {
            setUser({
                        accessToken: localStorage.getItem('accessToken'),
                        email: localStorage.getItem('email'),
                        isAdmin: localStorage.getItem('isAdmin')
                    }
            )
        } 
    }, [])


    return (
        <UserProvider value={{user, setUser}}>
            <Router>
                <main className="wrapper">
                    <Switch>
                        <Route exact path="/wishlist" target="/login" component={Wishlist} />
                        <Route exact path="/inquiries" target="/" component={Inquiries} />
                        <Route exact path="/login" target="/" component={LoginPage} />
                        <Route exact path="/logout" target="/" component={Logout} />
                        <Route exact path="/register" target="/" component={RegisterPage} />
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/admin" component={AdminPage} />
                    </Switch>
                </main>
            </Router>
        </UserProvider>
    );
}

export default App;
