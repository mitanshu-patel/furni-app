import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Hero from "../../components/Hero/Hero"

import '../Cart/Cart.css'

const Cart = (props) => {

    const [total, setTotal] = useState(0);
    useEffect(() => {
        props.handleAppState({
            activeRoute: 'cart'
        })

        setTotal(props.cartProducts.reduce((acc, v) => acc + (v.price * v.quantity), 0));
    }, [])

    function removeItem(id) {
        let products = props.cartProducts;
        products.splice(products.findIndex(v => v.productId == id), 1);
        props.handleCartState(products);
        setTotal(products.reduce((acc, v) => acc + (v.price * v.quantity), 0));
    }

    function handleInputChange(event) {
        updateQuantity(event.target.id, event.target.value);
    }

    function updateQuantity(id, value) {
        let products = props.cartProducts;
        const index = products.findIndex(v => v.productId == id);
        if (index > -1 && value <= 5) {
            products[index].quantity = value;
            props.handleCartState([...products]);
            setTotal(products.reduce((acc, v) => acc + (v.price * v.quantity), 0));
        }
    }

    function addQuantity(id) {
        let products = props.cartProducts;
        const index = products.findIndex(v => v.productId == id);
        if (index > -1) {
            if (products[index].quantity > 0 && products[index].quantity <= 5) {
                products[index].quantity += 1;
                props.handleCartState([...products]);
                setTotal(products.reduce((acc, v) => acc + (v.price * v.quantity), 0));
            }
        }
    }


    function removeQuantity(id) {
        let products = props.cartProducts;
        const index = products.findIndex(v => v.productId == id);
        if (index > -1) {
            if (products[index].quantity > 1) {
                products[index].quantity -= 1;
                props.handleCartState([...products]);
                setTotal(products.reduce((acc, v) => acc + (v.price * v.quantity), 0));
            }
        }
    }

    return (<>
        <Hero title="Cart"></Hero>
        <div className="untree_co-section before-footer-section">
            <div className="container">
                <div className="row mb-5">
                    <form className="col-md-12" method="post">
                        <div className="site-blocks-table">
                            {props.cartProducts.length > 0 ?

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail">Image</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-total">Total</th>
                                            <th className="product-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.cartProducts.map(t => {
                                                return (
                                                    <tr key={t.productId}>
                                                        <td className="product-thumbnail">
                                                            <img src={t.imageUrl} alt="" className="img-fluid" />
                                                        </td>
                                                        <td className="product-name">
                                                            <h2 className="h5 text-black">{t.name}</h2>
                                                        </td>
                                                        <td>${t.price}</td>
                                                        <td>
                                                            <div className="input-group mb-3 d-flex align-items-center quantity-container">
                                                                <div className="input-group-prepend">
                                                                    <button className="btn btn-outline-black decrease" type="button" onClick={() => removeQuantity(t.productId)}>&minus;</button>
                                                                </div>
                                                                <input type="text" id={t.productId} className="form-control text-center quantity-amount" onChange={handleInputChange} value={t.quantity} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-outline-black increase" type="button" onClick={() => addQuantity(t.productId)}>+</button>
                                                                </div>
                                                            </div>

                                                        </td>
                                                        <td>${Math.round(t.quantity * t.price, 2)}</td>
                                                        <td><a className="btn btn-black btn-sm" onClick={() => removeItem(t.productId)}>X</a></td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table> : <h3>No Products Added</h3>
                            }
                        </div>
                    </form>
                </div>

                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6 pl-5">
                        <div className="row justify-content-end">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-12 text-right border-bottom mb-5">
                                        <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-6">
                                        <span className="text-black">Total</span>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <strong className="text-black">${Math.round(total,2)}</strong>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="btn btn-black btn-lg py-3 btn-block">Proceed To Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Cart;