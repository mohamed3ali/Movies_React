import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import {Navigate, Outlet} from 'react-router-dom';
export default function Layout({userData,setuserDate}) {
  function logOut(){
    localStorage.removeItem('userToken');
    setuserDate(null);
    Navigate('/login')
  }
  return (
    <div>
        <Navbar logOut={logOut} userData={userData}/>
        <div className='container'>
        <Outlet> </Outlet>
        </div>

        <Footer/>
    </div>
  )
}
