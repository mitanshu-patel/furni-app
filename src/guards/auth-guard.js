import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
let isAuthenticated = false;

const useRouteGuard = () => {
  const navigate = useNavigate();

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
    if (!isAuthenticated) {
      navigate("/login");
    }
  },
  // [isAuthenticated, navigate]
  []
);

  return isAuthenticated;
};

export default useRouteGuard;
