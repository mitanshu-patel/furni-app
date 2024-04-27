import { useNavigate, Link } from "react-router-dom";
import '../Header/Header.css'
import { useEffect } from "react";

const Header = (props) => {
    const navigate = useNavigate();

    function clearSession() {
        props.handleUserState({
            userName: ''
        })
        localStorage.removeItem('userDetails');
        localStorage.removeItem('cartData');
        navigate('/login')
    }
    return (<nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

        <div className="container">
            <a className="navbar-brand" href="index.html">Furni<span>.</span></a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsFurni">
                <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                    <li className={props.activeRoute === 'home' ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className={props.activeRoute === 'shop' ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/shop">Shop</Link></li>
                    <li className={props.activeRoute === 'about-us' ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/about-us">About us</Link></li>
                    <li className={props.activeRoute === 'services' ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/services">Services</Link></li>
                    <li className={props.activeRoute === 'blog' ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/blog">Blog</Link></li>
                    <li className={props.activeRoute === 'contact-us' ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/contact-us">Contact us</Link></li>
                </ul>

                <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                    {props.userName === '' ? <li className={props.activeRoute === 'login' || props.activeRoute === 'register' ? 'nav-item icon-active' : 'nav-item'}><Link className="nav-link" to="/login"><img src="images/user.svg" alt="" /></Link></li> : <li className="nav-item username">{props.userName}</li>}
                    {props.userName === '' ? null : <li className="nav-item username logout-link" onClick={clearSession}>Logout</li>}
                    <li className={props.activeRoute === 'cart' ? 'nav-item icon-active' : 'nav-item'}><Link className="nav-link" to="/cart"><img src="images/cart.svg" alt="" /></Link>{props.productCount > 0 ? <span className="cart-count">{props.productCount}</span> : null}</li>
                </ul>
            </div>
        </div>

    </nav>)
}

export default Header;