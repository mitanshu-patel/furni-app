import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Shop from './containers/Shop/Shop';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import Register from './containers/Register/Register';
import Cart from './containers/Cart/Cart';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';

const App = () => {
  const [appState, setAppState] = useState({
    activeRoute: ''
  })

  const [toastState, setToastState] = useState({
    successMessage: ''
  })

  function closeToast() {
    setToastState({
      successMessage: ''
    })
  }
  return (
    <>
      <Header activeRoute={appState.activeRoute}></Header>
      <Routes>
        <Route exact path="/" element={<Home handleAppState={setAppState}></Home>} />
        <Route path="/shop" element={<Shop handleAppState={setAppState}></Shop>} />
        <Route path="/about-us" element={<Home handleAppState={setAppState}></Home>} />
        <Route path="/services" element={<Home handleAppState={setAppState}></Home>} />
        <Route path="/blog" element={<Home handleAppState={setAppState}></Home>} />
        <Route path="/contact-us" element={<Home handleAppState={setAppState}></Home>} />
        <Route path="/cart" element={<Cart handleAppState={setAppState} handleToastState={setToastState}></Cart>} />
        <Route path="/login" element={<SignIn handleAppState={setAppState} handleToastState={setToastState}></SignIn>} />
        <Route path="/register" element={<Register handleAppState={setAppState} handleToastState={setToastState}></Register>} />
      </Routes>
      {toastState.successMessage != '' ? <Toast message={toastState.successMessage} handleToast={closeToast}></Toast> : null}
      <Footer></Footer>
    </>
  )
}

export default App;
