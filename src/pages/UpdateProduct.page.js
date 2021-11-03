/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Navbar from 'components/Navbar.component';
import ReactHelmet from 'components/Helmet.component';

export default function UpdateProduct() {
    const Router = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');



    const updateProduct = (e, productId) => {
        e.preventDefault();

        fetch(`http://localhost:4000/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                    body: JSON.stringify({                     
                        "name": name,
                        "description": description,
                        "category": category,
                        "price": price                       
                    })
                })
                .then(res => res.json())
                .then(data =>{
                    if(data === true) {
                        Swal.fire({
                            title: 'Hooray!',
                            icon: 'success',
                            text: 'You have successfully updated a course!',
                            footer: '<a href="">Click here for details</a>'
                        })
                        Router.replace('/')
                    } else {
                        Swal.fire({
                            title: 'Something went wrong',
                            icon: 'error',
                            text: 'Please try again'
                        })
                    }
                })

        
    };

    return (
        <>
            <section className="login">
                <ReactHelmet title="Update Product - Silicon Mafia" />
                <Navbar />
                <section className="container login-container">
                    <form className="form" onSubmit={(e) => updateProduct(e)}>
                        <label className="form-group">
                            Name
                            <input type="text" autoComplete="off" placeholder="Name" onInput={e=> setName(e.target.value)} value={name} required />
                        </label>
                        <label className="form-group">
                            Description
                            <input type="text" autoComplete="off" placeholder="Description" onInput={e=> setDescription(e.target.value)} value={description} required />
                        </label>
                        <label className="form-group">
                            Category
                            <input type="text" autoComplete="off" placeholder="Category" onInput={e=> setCategory(e.target.value)} value={category} required />
                        </label>
                        <label className="form-group">
                            Price
                            <input type="number" autoComplete="off" placeholder="Enter your Mobile Number" onInput={e=> setPrice(e.target.value)} value={price} required />
                        </label>                            
                            <button className="form-submit" type="submit">Submit</button>

                        <br />
                    </form>
                </section>
            </section>
        </>
    );
}
