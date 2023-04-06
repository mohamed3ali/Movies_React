import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate}  from 'react-router-dom';
import Joi from 'joi';
export default function Login({saveUserData}) {
let navigate = useNavigate();
const [errorList ,setErrorList]= useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user , setUser] = useState({
    email:'',
    password:'',



  })
  function getUserData(e){
 let myUser ={...user};
 myUser[e.target.name] = e.target.value;
 setUser(myUser);
 console.log(myUser)
  }
  async function sentLoginDataToApi(){
   let {data} = await axios.post(`https://sticky-note-fe.vercel.app/signin`,user);
   if(data.message === 'success'){
    setLoading(false);
    localStorage.setItem('userToken', data.token);
    saveUserData();
    navigate('/home')
   }else
   {
    setLoading(false)
    setError(data.message)
   }
  }

  function submitLoginForm(e){
    e.preventDefault();
    setLoading(true);
   let validation = validateLoginForm();
   if(validation.error){
    setLoading(false);
    setErrorList(validation.error.details)
   }else
   {
    sentLoginDataToApi();
   }

  }

  function validateLoginForm(){
    let scheme = Joi.object({
      email:Joi.string().email({minDomainSegments:2, tlds:{allow:['com','net']}}).required(),
      password:Joi.string().pattern(/^[A-Z][a-z]{0,9}/)

    });
  return scheme.validate(user,{abortEarly:false});;
  }
  return <>
  {errorList.map((err,index)=> <div key={index} className="alert alert-danger my-2">{err.message}</div>)}
    {error.length >0 ?<div className="alert alert-danger my-2">{error}</div>:''}
     
 <form onSubmit={submitLoginForm}>
  
  <label htmlFor='email'>email:</label>
  <input  onChange={getUserData} type="email" className="form-control my-input my-2" name="email" id="email"/>
  <label htmlFor='password'>password:</label>
  <input  onChange={getUserData} type="password" className="form-control my-input my-2" name="password" id="password"/>
<button className='btn btn-info'>
  {loading === true? <i className='fas fa-spinner fa-spin'></i>:'Login'}</button>
 </form>
 </>
}
