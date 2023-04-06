import React from 'react'
import img from '../img/220px-ErenYeager.jpg';
export default function Profile({userData}) {
  let {first_name, last_name , age , email} = userData;
  return <>
  <img src={img} alt='mm'/>
  <h4>Name:{first_name} {last_name}</h4>
  <h4>Age:{age}</h4>
  <h4>Emali:{email}</h4>
  </>
  
}
