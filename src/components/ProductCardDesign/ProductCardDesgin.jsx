import React from 'react'
import './ProductCardDesign.css'
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';


function ProductCardDesgin({element,image, title, price, description}) {

    const [isCartActive, setCartActive] = useState(false);

    
   
    

    // const handleAddToCart = () => {
    //     setCartActive(true);
    // };

    const handleCancelCart = () => {
        setCartActive(false);
    };

    // Function to handle adding an item to the cart
    // const addToCart = () => {
    //     setCartItems(cartItems + 1);
    // };
    // const cancelCart = () => {
    //     setCartItems(0);
    // }

    return (
        <div className='card-design'>
            <div class="container page-wrapper">
                <div class="page-inner">
                    <div class="row">
                        <div class="el-wrapper">
                            <div class="box-up">
                                <img class="img" src={image} alt="" />
                                <div class="img-info">
                                    <div class="info-inner">
                                        <span class="p-name">{title}</span>
                                        <span class="p-company">Yeezy</span>
                                    </div>
                                    <div class="a-size"><span class="size">{description}</span></div>
                                </div>
                            </div>

                            <div class="box-down">
                                <div class="h-bg">
                                    <div class="h-bg-inner"></div>
                                </div>

                                <a class="cart">
                                    <span class="price">${price}</span>
                                    <span class="add-to-cart">
                                        <span class="txt">Add in cart</span>
                                        
                                        {/* {isCartActive ? (
                                            <div>
                                                <p>Item added to cart!</p>
                                                <button onClick={handleCancelCart}>Cancel</button>
                                            </div>
                                        ) : (
                                            <button onClick={handleAddToCart(store)}>Add to Cart </button>
                                        )} */}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ProductCardDesgin