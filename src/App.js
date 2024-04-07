import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Shop from './containers/Shop/Shop';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import Register from './containers/Register/Register';
import Cart from './containers/Cart/Cart';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';
import useRouteGuard from './guards/auth-guard';
import useDefaultRedirectGuard from './guards/default-redirect-guard';

const App = () => {
  const isAuthenticated = useRouteGuard();
  const isLoggedIn = useDefaultRedirectGuard();
  useEffect(() => {
    updateUserState();
    updateCartState();
  },[])

  function updateUserState() {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString !== '' && userDetailsString !== null) {
      const obj = JSON.parse(userDetailsString);
      if (obj.userName != undefined && obj.userName !== userState.userName) {
        setUserState({
          userName: obj.userName
        })
      }
      else if (!obj.userName) {
        localStorage.removeItem('userDetails');
      }
    }
  }

  function updateCartState() {
    const storedCartData = localStorage.getItem('cartData');
    console.log("Cart data", storedCartData);
    if (storedCartData !== '' && storedCartData !== null) {
      setCartData([...JSON.parse(storedCartData)]);
    }
  }

  const [appState, setAppState] = useState({
    activeRoute: ''
  })

  const [toastState, setToastState] = useState({
    successMessage: ''
  })

  const [userState, setUserState] = useState({
    userName: ''
  })

  const [cartData, setCartData] = useState([]);

  function closeToast() {
    setToastState({
      successMessage: ''
    })
  }

  function updateAppState(obj) {
    if (obj.activeRoute !== appState.activeRoute) {
      setAppState(obj);
    }
  }

  function updateCart(products) {
    setCartData([...products]);
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  return (
    <>
      <Header activeRoute={appState.activeRoute} userName={userState.userName} handleUserState={setUserState} productCount={cartData.length}></Header>
      <Routes>
        <Route exact path="/" element={<Home handleAppState={updateAppState}></Home>} />
        <Route path="/home" element={<Home handleAppState={updateAppState}></Home>} />
        <Route path="/shop" element={<Shop handleAppState={updateAppState} handleCartState={updateCart} cartProducts={cartData}></Shop>} />
        <Route path="/about-us" element={<Home handleAppState={updateAppState}></Home>} />
        <Route path="/services" element={<Home handleAppState={updateAppState}></Home>} />
        <Route path="/blog" element={<Home handleAppState={updateAppState}></Home>} />
        <Route path="/contact-us" element={<Home handleAppState={updateAppState}></Home>} />
        <Route path="/cart" element={<Cart handleAppState={updateAppState} handleToastState={setToastState} cartProducts={cartData} handleCartState={updateCart}></Cart>} />
        <Route path="/login" element={<SignIn handleAppState={updateAppState} handleToastState={setToastState} handleUserState={setUserState}></SignIn>} />
        <Route path="/register" element={<Register handleAppState={updateAppState} handleToastState={setToastState}></Register>} />
      </Routes>
      {toastState.successMessage != '' ? <Toast message={toastState.successMessage} handleToast={closeToast}></Toast> : null}
      <Footer></Footer>
    </>
  )
}

export default App;
