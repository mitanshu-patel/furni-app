import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

let isAuthenticated = false;
const useDefaultRedirectGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const userDetailsString = localStorage.getItem('userDetails');
  //   if (userDetailsString !== '' && userDetailsString !== null) {
  //     const obj = JSON.parse(userDetailsString);
  //     if (obj.userName !== undefined) {
  //       isAuthenticated = true;
  //     }
  //   }
  // }, []);

  function isUserAuthenticated(){
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString !== '' && userDetailsString !== null) {
      const obj = JSON.parse(userDetailsString);
      if (obj.userName !== undefined) {
        isAuthenticated = true;
      }
    }
  }

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    isUserAuthenticated();
    console.log(location.pathname);
    if (isAuthenticated && location.pathname.indexOf('login') > -1) {
      navigate("/home");
    }
  }, //[isAuthenticated, navigate]
  []
);

  return isAuthenticated;
};

export default useDefaultRedirectGuard;
