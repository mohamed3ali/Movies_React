import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate}  from 'react-router-dom';
import Joi from 'joi';
export default function Register() {
let navigate = useNavigate();
const [errorList ,setErrorList]= useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user , setUser] = useState({
    first_name: '',
    last_name: '',
    email:'',
    password:'',
    age:0,


  })
  function getUserData(e){
 let myUser ={...user};
 myUser[e.target.name] = e.target.value;
 setUser(myUser);
 console.log(myUser)
  }
  async function sentRegisterDataToApi(){
   let {data} = await axios.post(`https://sticky-note-fe.vercel.app/signup`,user);
   if(data.message === 'success'){
    setLoading(false)
    navigate('/login')
   }else
   {
    setLoading(false)
    setError(data.message)
   }
  }

  function submitRegisterForm(e){
    e.preventDefault();
    setLoading(true);
   let validation = validateRegisterForm();
   if(validation.error){
    setLoading(false);
    setErrorList(validation.error.details)
   }else
   {
    sentRegisterDataToApi();
   }

  }

  function validateRegisterForm(){
    let scheme = Joi.object({
      first_name:Joi.string().pattern(/^[A-Z]/).min(2 ).max(20).required(),
      last_name:Joi.string().min(3).max(50).required(),
      age:Joi.number().min(1).max(100).required(),
      email:Joi.string().email({minDomainSegments:2, tlds:{allow:['com','net']}}).required(),
      password:Joi.string().pattern(/^[A-Z][a-z]{0,9}/)

    });
  return scheme.validate(user,{abortEarly:false});;
  }
  return <>
  {errorList.map((err,index)=> <div key={index} className="alert alert-danger my-2">{err.message}</div>)}
    {error.length >0 ?<div className="alert alert-danger my-2">{error}</div>:''}
     
 <form onSubmit={submitRegisterForm}>
  <label htmlFor='first_name'>first_name:</label>
  <input onChange={getUserData} type="text" className="form-control my-input my-2" name="first_name" id="first_name"/>
  <label htmlFor='last_name'>last_name:</label>
  <input  onChange={getUserData} type="text" className="form-control my-input my-2" name="last_name" id="last_name"/>
  <label htmlFor='age'>age:</label>
  <input  onChange={getUserData} type="number" className="form-control my-input my-2" name="age" id="age"/>
  <label htmlFor='email'>email:</label>
  <input  onChange={getUserData} type="email" className="form-control my-input my-2" name="email" id="email"/>
  <label htmlFor='password'>password:</label>
  <input  onChange={getUserData} type="password" className="form-control my-input my-2" name="password" id="password"/>
<button className='btn btn-info'>
  {loading === true? <i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
 </form>
 </>
}
