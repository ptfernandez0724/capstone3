/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const Router = useHistory();


    const navbarMenuLi = (e) => {
        const { target } = e;
        setToggle(false);
        Router.replace(target.getAttribute('path'));
    };

    useEffect(() => {
    }, [])
    

    let navbarOption;

    if (localStorage.getItem('isAdmin')=='false') {
        navbarOption = (                        
            <>
                <li path="/wishlist" onClick={(e) => navbarMenuLi(e)}
                >
                    Wishlist
                </li>
    
                <li path="/inquiries" onClick={(e) => navbarMenuLi(e)}
                >
                    Inquiries
                </li>
            
                <li path="/logout" onClick={(e) => navbarMenuLi(e)}>Logout</li>
            </>
        )
    } else if (localStorage.getItem('isAdmin')=='true') {
        navbarOption = (
            <>
                <li path="/admin" onClick={(e) => navbarMenuLi(e)}>
                    Admin
                </li>
                <li path="/logout" onClick={(e) => navbarMenuLi(e)}>Logout</li>
            </>
        )
    } else {
        navbarOption = (
            <>
                <li path="/register" onClick={(e) => navbarMenuLi(e)}>Sign Up</li>
                <li path="/login" onClick={(e) => navbarMenuLi(e)}>Sign In</li>
            </>
        )
    }

    return (
        <nav className="navbar">
        
            <section className="navbar-container">
            <h3 onClick={() => Router.replace('/')}>Exotic</h3>
                
                <button type="button" className={(toggle) ? 'navbar-toggle focus' : 'navbar-toggle'} onClick={() => setToggle(!toggle)}>
                    <span className="icon" />
                    <span className="icon" />
                    <span className="icon" />
                </button>
                <section className={(toggle) ? 'navbar-menu focus' : 'navbar-menu'}>
                    <ul>
                        <li path="/" onClick={(e) => navbarMenuLi(e)}>Home</li>

                        {navbarOption}

                    </ul>
                </section>
            </section>
        </nav>
    );
}
