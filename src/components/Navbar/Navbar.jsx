import React from 'react'
import './Navbar.css'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RedeemIcon from '@mui/icons-material/Redeem';
import cartPng from '../../assets/shopping-cart.png'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {ADD} from '../../redux/actions/action'
import { Drawer, Box, Typography, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Table from 'react-bootstrap/Table';
import { DLT } from '../../redux/actions/action';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';



const Navbar = ({}) => {

    const [itemAdded, setItemAdded] = useState(false);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

      const styles = {
        alert: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#42b983',
          color: '#fff',
          textAlign: 'center',
          padding: '10px',
        },
      };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const getData = useSelector((state) => state.cartreducer.carts);
    console.log(getData); 


    const [store, setStore] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isCartActive, setCartActive] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [price , setPrice] = useState(0);
    // console.log(price)

    useEffect(() => {
        getStore();
    }, [searchValue]);

    const getStore = () => {      
        Axios.get(`https://fakestoreapi.com/products`)
        .then((response) => {
        console.log(response.data);
          setStore(response.data)
        })
        .catch(error => {console.log(error)});
        }

    const updateSearch = event => {
        setSearchValue(event.target.value)
    }
    const itemsFilter = store.filter((store) => 
    store.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const getSearch = event => {
        event.preventDefault();
        setStore(itemsFilter);
      }

      const handleCancelCart = () => {
        setCartActive(false);
    };

      const dispatch = useDispatch();

      const send = (store) => {
        // console.log(store);
        dispatch(ADD(store));
        setCartActive(true);
        setShowAlert(true);
        setTimeout(() => {
        }, 3000);
    }
    
    const dlt = (id) => {
        dispatch(DLT(id))
    }

    const total =() => {
        let price = 0;
        getData.map((store,k)=>{
            price = store.price + price
        });
        setPrice(price);
    }
    useEffect(()=> {
        total();
    },[total])

    return (
        <div className='nav-main'>
            <section>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                                <div className="container-fluid">
                                    <a className="navbar-brand navbar-font ps-3 fs-2" href="#">SHOPP<RedeemIcon className='gift-icon'></RedeemIcon>NG</a>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="formMain">
                                        <form onSubmit={getSearch} className="d-flex" role="search">
                                            <input onChange={updateSearch} value={searchValue} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                        </form> 
                                    </div>
                                    {/* <button className='cartBtn1'><ShoppingCartCheckoutIcon className='fs-1 py-1'></ShoppingCartCheckoutIcon></button> */}
                                     <IconButton
                                        onClick={() => setIsDrawerOpen(true)}
                                        size='large'
                                        edge='start'
                                        color='inherit'
                                        aria-label='logo'>
                                        <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={getData.length} color="secondary">
                                            <ShoppingCartIcon className='fs-2' />
                                        </StyledBadge>
                                        </IconButton>
                                    </IconButton>
                                    <Drawer
                                        anchor='right'
                                        open={isDrawerOpen}
                                        onClose={() => setIsDrawerOpen(false)}>
                                        <Box className='drawer' p={2} width='350px' role='presentation' textAlign='center'>
                                        <Typography variant='h6' component='div'>
                                            CART PRODUCT
                                        </Typography>
                                        {
                                            getData.length ?
                                            <div className='card-details'>
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>Your Product</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        getData.map((store)=> {
                                                            return (
                                                                <>
                                                                <div className='pt-3 d-flex justify-content-center align-items-center'>
                                                                <div style={{width:"15rem"}} class=" card d-flex justify-content-center align-items-center py-4">
                                                                        <img src={store.image} alt="Avatar" style={{width:"50%"}}/>
                                                                        <div class="container">
                                                                            <h4><b>{store.title}</b></h4>
                                                                            <p>${store.price}</p>
                                                                        </div>
                                                                        <button onClick={()=>dlt(store.id)} style={{backgroundColor:"red"}} className='text-white'>Delete</button>
                                                                    </div>
                                                                </div>    
                                                                </>
                                                            )
                                                        })
                                                        }
                                                        <h3>Total: ${price} </h3>
                                                    </tbody>
                                                </Table>
                                                
                                           
                                            </div> :
                                            <p className='text-warning fs-3'>your cart is empty!<br/><ProductionQuantityLimitsIcon className='fs-1'></ProductionQuantityLimitsIcon></p>
                                        }
                                        </Box>
                                    </Drawer>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-clr'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 py-5 mt-5">
                            <h1 className='fashionova'>
                                Fashio<ShoppingBagIcon className='icon'></ShoppingBagIcon>ova
                                <img className='cartPng' src={cartPng} alt="" />
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='pt-4'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product-card d-flex flex-wrap justify-content-center align-items-center">
                                {store.map((store,id) => {
                                    return (
                                        <>
                                         <div key={id} class="page-wrapper">
                                                <div class="page-inner">
                                                    <div class="row">
                                                        <div class="el-wrapper mx-3">
                                                            <div class="box-up">
                                                                <img class="img" src={store.image} alt="" />
                                                                <div class="img-info">
                                                                    <div class="info-inner">
                                                                        <span class="p-name">{store.title}</span>
                                                                        <span class="p-company">Yeezy</span>
                                                                    </div>
                                                                    <div class="a-size"><span class="size">{store.description}</span></div>
                                                                </div>
                                                            </div>

                                                            <div class="box-down">
                                                                <div class="h-bg">
                                                                    <div class="h-bg-inner"></div>
                                                                </div>

                                                                <a class="cart">
                                                                    <span class="price">${store.price}</span>
                                                                    <span class="add-to-cart">
                                                                        <span class="txt">Add in cart</span>
                                                                        {/* <button onClick={()=> send(store)}>Add to Cart</button> */}
                                                                            <button onClick={()=> send(store)}>Add to Cart</button>
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Navbar
// 
// 