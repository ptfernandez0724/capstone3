/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import ReactHelmet from 'components/Helmet.component';
import { useHistory } from 'react-router-dom';
import UserContext from 'UserContext';
import placeholderimg from '../assets/img/placeholder-vehicle.jpg'
import Swal from 'sweetalert2';

import Navbar from '../components/Navbar.component';

export default function Wishlist() {
    const Router = useHistory();
    const {user} = useContext(UserContext);
    const [wishlist, setWishlist] = useState([]);
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
        fetch('https://calm-fortress-14055.herokuapp.com/users/wishlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setWishlist(data)
        })
    }, [])

    const removeProduct = (product) => {
        fetch('https://calm-fortress-14055.herokuapp.com/users/removetowishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                productId: product.productId
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.result){
                Toast.fire({
                    icon: 'success',
                    title: 'Remove Successfully'
                })
                    Router.replace('/')
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Remove failed'
                    })
                }
        })       
    }
    const inquire = (product) => {
            fetch('https://calm-fortress-14055.herokuapp.com/users/inquire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                productId: product.productId
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
    }

    const displayWishlist = wishlist.map((product) => (
        <section className="product" key={product.productId}>
            <img
                src={placeholderimg}
                alt={product.name}
                className="product-img"
            />
            <section className="product-flex">
                <h5>
                {product.productName}
                </h5>
                <h6>
                {`Php ${product.productPrice}`}  
                </h6>
            </section>
            <section className="product-flex">
                <button onClick={() => inquire(product)} type="button"> Inquire </button>
                <button onClick={() => removeProduct(product)} type="button"> Remove </button>
            </section>
        </section>
    ));

    return (
        <>
            <ReactHelmet title="Wishlist - Exotic Car Exchange" />
            <Navbar />
            <section className="container content">
                <h1>
                     Your Wishlist
                </h1>
                <section className="container">
                    <section className="product-container">{displayWishlist}</section>
                </section>
            </section>
        </>
    );
}
