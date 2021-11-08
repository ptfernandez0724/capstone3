/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-unresolved */
/* eslint-disable */
import UserContext from 'UserContext';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReactHelmet from 'components/Helmet.component';
import Swal from 'sweetalert2';
import Video from '../assets/videos/tachometer.mp4';
import placeholderimg from '../assets/img/placeholder-vehicle.jpg'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import Navbar from '../components/Navbar.component';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [fetchFinished, setFetchFinished] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const Router = useHistory();

    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");
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

    const override = css`
        display: fixed;
        position: absolute;
        left: 45%;
        margin: auto;
        border-color: red;
    `
    
    const fetchData = () => {
        fetch('https://calm-fortress-14055.herokuapp.com/products/allavailable')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        console.log("fetchFinished: " + fetchFinished)
    }, [fetchFinished]);


    const addToWishlist = (product) => {
        if(user.isAdmin !== true){
            fetch('https://calm-fortress-14055.herokuapp.com/users/addtowishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                productId: product._id
            })
        })
            .then(res => res.json())
            .then(data => {
            if(data.result){
                Toast.fire({
                    icon: 'success',
                    title: 'Added to wishlist'
                })
            }else{
                Toast.fire({
                    icon: 'error',
                    title: 'Something went wrong'
                })
                }
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'User Admin not allowed'
            })
        }       
    }

    const inquire = (product) => {
        if(user.isAdmin !== true){
            fetch('https://calm-fortress-14055.herokuapp.com/users/inquire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                productId: product._id
            })
            })
            .then(res => res.json())
            .then(data => {
            if(data.result){
                Toast.fire({
                    icon: 'success',
                    title: 'You have inquired to this product'
                })
            }else{
                Toast.fire({
                    icon: 'error',
                    title: 'Something went wrong'
                })
                }
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'User Admin not allowed'
            })
        }
        
    }

    let displayProduct;

    if (loading) {
        displayProduct = (
            <ClipLoader color={color} loading={loading} css={override} size={150} />
        )
    } else if (!loading && products.length>0) {
        displayProduct = products.map((product) => (
                <section className="product" key={product._id}>
                    <img
                        src={placeholderimg}
                        alt={product.name}
                        className="product-img"
                    />
        
                    <section className="product-flex">
                        <div><h5>{product.name}</h5></div>
                        <br />
                        <h6>{`Php ${parseInt(product.price, 10)}`}</h6>
                    </section>
                    <section className="product-flex">
                        <button
                            type="button"
                            onClick={() => (user ? addToWishlist(product) : Router.replace('/login'))}
                        >
                            Add to wishlist
                        </button>
                        <button
                            type="button"
                            onClick={() => (user ? inquire(product) : Router.replace('/login'))}
                            className="buy"
                        >
                            Inquire now
                        </button>
                    </section>
                </section>
        ));
    } else if (!loading && products.length <=0 ) {
        displayProduct =  (
            <div>
                <h4>Sorry but we do not have {searchTerm} yet</h4>
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        fetch(`https://calm-fortress-14055.herokuapp.com/products/search/${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
    };


    return (
        <>
            <ReactHelmet title="Exotic Car Exchange" />
            <Navbar />
            <section className="hero content">
                <section className="hero-container">
                    <video autoPlay muted loop>
                        <source src={Video} type="video/mp4" />
                    </video>
                    {/* <div className="search-container">
                        <form className="search-form">
                            <div className="input-wrapper">
                                <input type="text" />
                            </div>
                        </form>
                    </div> */}

                    <div className="search-container"> 
                        <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="input-wrapper">
                                <input type="text" autocomplete="off" className="search-input" placeholder="What are you looking for" onInput={e => setSearchTerm(e.target.value)} value={searchTerm}/>
                                <div className="searchBtnContainer">
                                    <button className="search-button">
                                        <span className="searchBtnText">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>


                    
                </section>
            </section>
            <section className="container">
                <section className="product-container">{displayProduct}</section>
            </section>           
        </>
    );
}
