/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Navbar from 'components/Navbar.component';
import ReactHelmet from 'components/Helmet.component';
import Logo from 'assets/img/logo.png';
import Footer from 'components/Footer.component';

export default function RegisterPage() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
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
        
        if((firstName !== '' && lastName !== '' && email !== '' && mobileNo !== '' && mobileNo.length === 11 && password1 !== '' && password2 !== '') && (password1 === password2)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password1, password2])

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/users/email-exists', {
                    method: 'POST',
                    headers: {
                    "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({                     
                        email: email                       
                    })
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data)
                    if(data === true) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Email already exists'
                        }) 
                    } else {
                        fetch('https://calm-fortress-14055.herokuapp.com/users/register' , {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "firstName": firstName,
                                "lastName": lastName,
                                "mobileNo": mobileNo,
                                "email": email,
                                "password": password1,
                                "isAdmin": false                               
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            
                            setFirstName('');
                            setLastName('');
                            setMobileNo('');
                            setEmail('');
                            setPassword1('');
                            setPassword2('');

                            Toast.fire({
                                icon: 'success',
                                title: 'You have registered.'
                            }) 
                        })
                        history.push('/login')
                    }
                })

        
    };

    return (
        <>
            <section className="login">
                <ReactHelmet title="Sign Up - Exotic Car Exchange" />
                <Navbar />
                <section className="container login-container">
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <img src={Logo} alt="Silicon Mafia" className="form-logo event-none" />
                        <label className="form-group">
                            First Name
                            <input type="text" autoComplete="off" placeholder="First Name" onInput={e=> setFirstName(e.target.value)} value={firstName} required />
                        </label>
                        <label className="form-group">
                            Last Name
                            <input type="text" autoComplete="off" placeholder="Last Name" onInput={e=> setLastName(e.target.value)} value={lastName} required />
                        </label>
                        <label className="form-group">
                            Mobile Number
                            <input type="tel" autoComplete="off" placeholder="Enter your Mobile Number" onInput={e=> setMobileNo(e.target.value)} value={mobileNo} required />
                        </label>
                        <label className="form-group">
                            Email Address
                            <input type="email" autoComplete="off" placeholder="Enter your Email" onInput={e => setEmail(e.target.value)} value={email} required />
                        </label>
                        <label className="form-group">
                            Password
                            <input type="password" autoComplete="off" placeholder="Enter your Password" onInput={e => setPassword1(e.target.value)} value={password1} required />
                        </label>
                        <label className="form-group">
                            Verify your Password
                            <input type="password" autoComplete="off" placeholder="Verify your Password" onInput={e => setPassword2(e.target.value)} value={password2} required />
                        </label>

                        {isActive
                            ?
                            <button className="form-submit" type="submit">Sign Up</button>
                            :
                            <button className="form-disabledsubmit" type="submit" disabled>Sign Up</button>
                        }

                        <br />
                        <p>
                            <center>
                                Already have an account? <Link to="/login">Sign In</Link>
                            </center>
                        </p>
                    </form>
                </section>
            </section>
            <Footer />
        </>
    );
}
