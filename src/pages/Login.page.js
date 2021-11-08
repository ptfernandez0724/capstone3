/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable */
import UserContext from '../UserContext';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from 'assets/img/logo.png';
import Swal from 'sweetalert2';
import ReactHelmet from 'components/Helmet.component';
import Navbar from '../components/Navbar.component';
import Footer from 'components/Footer.component';
import { Router } from 'workbox-routing';
import Video from '../assets/videos/tachometer.mp4';

export default function LoginPage() {
    const Router = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useContext(UserContext);
    const [isActive, setIsActive] = useState(false);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    
    useEffect(() => {
        if(email !== '' && password !== ''){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password])

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://calm-fortress-14055.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data1 => {

            if(data1.accessToken) {
                fetch('https://calm-fortress-14055.herokuapp.com/users/details', {
                        headers: {
                            Authorization: `Bearer ${data1.accessToken}`
                        }
                    })
                    .then(res => res.json())
                    .then(data => {                  
                        localStorage.setItem('accessToken', data1.accessToken);
                        localStorage.setItem('email', data.email)
                        localStorage.setItem('isAdmin', data.isAdmin)

                        setUser({
                            accessToken: localStorage.getItem('accessToken'),
                            email: localStorage.getItem('email'),
                            isAdmin: localStorage.getItem('isAdmin') === 'true'
                        })                       
                        if(data.isAdmin === true){
                            Router.push('/admin')
                            Toast.fire({
                                icon: 'success',
                                title: 'Admin signed in successfully'
                            })
                        } else {
                            Router.push('/')
                            Toast.fire({
                                icon: 'success',
                                title: 'User signed in successfully'
                            })
                        }                      
                    })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Account does not exist'
                }) 
            }

        })
    };

    return (
        <>
            <Navbar />
            <section className="login">
                <ReactHelmet title="Log In - Exotic Car Exchange" />
                <section className="container login-container">
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <img src={Logo} alt="Silicon Mafia" className="form-logo event-none" />
                        <label className="form-group">
                            Email address
                            <input type="email" autoComplete="off" placeholder="Please input your Email Address" onInput={e => setEmail(e.target.value)} value={email} required />
                        </label>
                        <label className="form-group">
                            Password
                            <input type="password" autoComplete="off" placeholder="Enter your Password" onInput={e => setPassword(e.target.value)} value={password} required />
                        </label>
                        
                        {isActive
                            ?
                            <button className="form-submit" type="submit">Sign In</button>
                            :
                            <button className="form-disabledsubmit" type="submit" disabled>Sign In</button>
                        }
                        <br />
                        <p><center>Don't have an account yet? <Link to="/register">Sign Up</Link></center></p>
                    </form>
                </section>
            </section>
            <Footer />
        </>
    );
}
