import './App.css';
import Home from './Component/Home/Home';
import Layout from './Component/Layout/Layout';
import {createBrowserRouter,createHashRouter,RouterProvider} from 'react-router-dom';
import Movies from './Component/Movies/Movies';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import People from './Component/People/People';
import Tv from './Component/Tv/Tv';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Profile from './Component/Profile/Profile';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import ItemDetails from './Component/ItemDetails/ItemDetails';
import { Offline } from 'react-detect-offline';
import Search from './Component/Search/search';

function App() 
{
  useEffect(()=>{
    if(localStorage.getItem('userToken') !==null)
    {
      saveUserData();
    }
  } , [])
  const [userData, setuserDate] = useState(null);
function saveUserData(){
  let encodedToken = localStorage.getItem('userToken');
 let decodedToken = jwtDecode(encodedToken);
console.log(decodedToken);
 setuserDate(decodedToken)

}

  let routers = createHashRouter([
    {path:'/', element:<Layout setuserDate={setuserDate} userData={userData}/> , children:[
      {path:'home' , element:<ProtectedRoute userData={userData}><Home/></ProtectedRoute>},
      {path:'movies' , element:<ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
      {path:'profile' , element:<ProtectedRoute userData={userData}><Profile userData={userData}/></ProtectedRoute>},
      {path:'login' , element:<Login saveUserData={saveUserData}/>},
      {index:true, element:<Register/>},
      {path:'tv' , element:<ProtectedRoute userData={userData}><Tv/></ProtectedRoute>},
      {path:'search' , element:<ProtectedRoute userData={userData}><Search/></ProtectedRoute>},
      {path:'people' , element:<ProtectedRoute userData={userData}><People/></ProtectedRoute>},
      {path:'itemdetails/:id/:media_Type' , element:<ProtectedRoute userData={userData}><ItemDetails/></ProtectedRoute>},
    ]}
  ])
    return<>
      <div>
 
    <Offline> <div className='offline'> You are offline (surprise!)</div></Offline>
  </div>
  <RouterProvider router={routers}/>
    </> 
  }
export default App;

























