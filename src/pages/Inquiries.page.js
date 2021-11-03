/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import Moment from 'react-moment';
import ReactHelmet from 'components/Helmet.component';
import UserContext from 'UserContext';
import Navbar from '../components/Navbar.component';
import placeholderimg from '../assets/img/placeholder-vehicle.jpg'


export default function Inquiries() {
    const {user} = useContext(UserContext);
    const [inquiries, setInquiries] = useState([]);
    
    useEffect(() => {
        console.log("run")
        fetch('https://calm-fortress-14055.herokuapp.com/users/inquiries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("data: " + data)
            setInquiries(data)
        })
    }, [])


    const displayInquiries = inquiries.map((product) => (
        <section className="product" key={product._id}>
            <img
                src={placeholderimg}
                alt={product.name}
                className="product-img"
            />
            <section className="product-flex">
                <h5>{product.productName}</h5>
            <section className="product-flex"><h6>{`Php ${product.productPrice}`} </h6>
            </section>
                
                <h6>
                    Request Date: <Moment format="MM/DD/YYYY">{product.itemInquiries.requestDate}</Moment>
                </h6>
            </section>
        </section>
    ));

    return (
        <>
            <ReactHelmet title="Inquiries - Exotic Car Exchange" />
            <Navbar />
            <section className="container content">
                <h1>
                     Your Inquiries
                </h1>
                <section className="container">
                <section className="product-container"> {displayInquiries}</section>
                </section>
            </section>
        </>
    );
}
