/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import ReactHelmet from 'components/Helmet.component';
import Swal from 'sweetalert2';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import Navbar from '../components/Navbar.component';

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [showEdit, setShowEdit] = useState(false)
    
    const [productId, setProductId] = useState('')
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

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const fetchProductData = () => {
        fetch('https://calm-fortress-14055.herokuapp.com/products/all')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    }
    
    useEffect(() => {
        fetchProductData()
    }, [])

    const closeEdit = () => {
        setShowEdit(false)
        setName('')
        setDescription('')
        setPrice(0)
    }

    const openEdit = (productId) => {
        fetch(`https://calm-fortress-14055.herokuapp.com/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setProductId(data._id)
            setName(data.name)
            setDescription(data.description)
            setCategory(data.category)
            setPrice(data.price)
        })

        setShowEdit(true)
    }


    const addProduct = (e) => {
        e.preventDefault();

        fetch('https://calm-fortress-14055.herokuapp.com/products/', {
                    method: 'POST',
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
                        Toast.fire({
                            icon: 'success',
                            title: 'Added Successfully'
                        })
                        fetchProductData()
                        onCloseModal()
                        setName('')
                        setDescription('')
                        setCategory('')
                        setPrice(0)
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: 'Something went wrong.'
                        })
                    }
                })

        
    };

    const editProduct = (e, productId) => {
        e.preventDefault();
        fetch(`https://calm-fortress-14055.herokuapp.com/products/${productId}`, {
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
                    if(data) {  
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated Successfully'
                        })
                        fetchProductData()
                        closeEdit()
                    } else {
                        fetchProductData()
                        Toast.fire({
                            icon: 'error',
                            title: 'Something went wrong'
                        })
                    }
                })  
    }

    const deactivate = (productId, status) => {
        console.log("product: " + productId)
        fetch(`https://calm-fortress-14055.herokuapp.com/products/${productId}/archive`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                status: status
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                fetchProductData()
                Toast.fire({
                    icon: 'success',
                    title: 'Archive Successfully'
                })
                    
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong'
                    })
                }
        })       
    }

    const reactivate = (productId, status) => {
        console.log("product: " + productId)
        fetch(`https://calm-fortress-14055.herokuapp.com/products/${productId}/activate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                status: status
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                fetchProductData()
                Toast.fire({
                    icon: 'success',
                    title: 'Activated Successfully'
                })
                    
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong'
                    })
                }
        })       
    }

    const displayProducts = products.map((product) => (
        <li className="table-row" key={product._id}>
                <div className="col col-1">          
                <small>{product._id}</small>
                </div> 
                <div className="col col-2">
                <small>{product.name}</small>
                </div>
                <div className="col col-3">
                <small>{product.category}</small>
                </div>
                <div className="col col-4">
                <small>
                {`Php ${product.price}`}
                </small>
                </div>
                <div className="col col-5">
                <small>{product.status}</small>
                </div>
                <div className="col col-6">
                <button className="button" onClick={() => openEdit(product._id)}>Update</button>
                {product.status === "Available"
                    ?
                    <button className="button" onClick={() => deactivate(product._id, product.status)} type="button"> disable </button> 
                    :
                    <button className="button" onClick={() => reactivate(product._id, product.status)} type="button"> enable </button> 
                }
                 
                 </div>
        </li>
    ));

    return (
        <>
            <ReactHelmet title="Admin Page - Exotic Car Exchange" />
            <Navbar />
            <div className="container">
                <h2>
                     Admin Dashboard
                </h2>
                <button className="button" onClick={onOpenModal}>Add a Product</button>
                
                    <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">ID</div>
                        <div className="col col-2">Name</div>
                        <div className="col col-3">Category</div>
                        <div className="col col-4">Price</div>
                        <div className="col col-5">Availability</div>
                        <div className="col col-6">Actions</div>
                    </li>                    
                    {displayProducts}
                    </ul>
            </div>

            <Modal open={open} onClose={onCloseModal} center>
                <form className="form" onSubmit={(e) => addProduct(e)}>
                            <label className="form-group">
                                Name: 
                                <input type="text"  value={name} onChange={e => setName(e.target.value)} required/>
                            </label>
                            <label className="form-group">
                                Description: 
                                <input type="text"  value={description} onChange={e => setDescription(e.target.value)} required/>
                            </label>
                            <label className="form-group">
                                Category: 
                                <input type="text"  value={category} onChange={e => setCategory(e.target.value)} required/>
                            </label>
                            <label className="form-group">
                                Price: 
                                <input type="number"  value={price} onChange={e => setPrice(e.target.value)} required/>
                            </label>
                            <button className="button" type="submit" onClick={onCloseModal}>Submit</button>
                        </form>
            </Modal>

            <Modal open={showEdit} onClose={closeEdit} center>

                <form className="form" onSubmit={(e) => editProduct(e, productId)}>
                            <label className="form-group">
                                Name: 
                                <input type="text"  value={name} onChange={e => setName(e.target.value)} required/>
                            </label>
                            <label className="form-group">
                                Description: 
                                <input type="text"  value={description} onChange={e => setDescription(e.target.value)} required/>
                            </label>
                            <label className="form-group">
                                Category: 
                                <input type="text"  value={category} onChange={e => setCategory(e.target.value)} required/>
                            </label>
                            <label className="form-group">
                                Price: 
                                <input type="number"  value={price} onChange={e => setPrice(e.target.value)} required/>
                            </label>
                            <button className="button" type="submit">Submit</button>
                        </form>
                    </Modal>

        </>
    );
}
