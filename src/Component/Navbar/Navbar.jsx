import React from 'react'
import {Link} from 'react-router-dom'
export default function Navbar({userData,logOut}) {
  return (

  <nav className='p-2 d-flex justify-content-between flex-md-row flex-column'>
    
  <div className='left-nav d-flex align-items-center flex-md-row flex-column '>
    
    <h1 className='m-0 pe-3'>Noxe</h1>

  {userData?    <ul className='list-unstyled d-flex m-0 flex-md-row flex-column'>
      <li className='px-2'><Link to ='home'>Home</Link> </li>
      <li  className='px-2'><Link to ='movies'>Movies</Link> </li>
      <li  className='px-2'><Link to ='tv'>Tv</Link> </li>
      <li  className='px-2'><Link to ='people'>People</Link> </li>
      <li  className='px-2'><Link to ='search'>Search</Link> </li>
  
    </ul>:''}

  </div>
  <div className='left-nav d-flex align-items-center flex-md-row flex-column'>
    
    <div className='social-media '>

      <i className='fab mx-1 fa-facebook'></i>
      <i className='fab mx-1 fa-instagram'></i>
      <i className='fab mx-1 fa-twitter'></i>
      <i className='fab mx-1 fa-spotify'></i>
      <i className='fab mx-1 fa-youtube'></i>
      
    </div>
    <ul className='list-unstyled d-flex m-0 flex-md-row flex-column'>

{
  userData?    <>
  <li  className='px-2 cursor-pointer' onClick={logOut}><span>LogOut</span> 
</li> 
<li  className='px-2'><Link to ='/profile'>Profile</Link> </li>
  </>:<>
  <li className='px-2'><Link to ='login'>Login</Link> </li>
      <li  className='px-2'><Link to ='/'>Register</Link> </li></>
}

    </ul>
  </div>

  </nav>
  
  ) 
  
}
