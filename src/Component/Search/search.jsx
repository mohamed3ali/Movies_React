import axios from 'axios'
import React, { Fragment, useState } from 'react'
const Search = () => {
    let [searchItem, setSearchItem] = useState([])
    let getTrending = async (e) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b44e5bbfa6921b60c1a1e3941df29c03&query=${e.target.value}`)
        console.log(data.results)
        setSearchItem(data.results)
    }
    return (
        <Fragment>
            <div className='search mt-4 ms-3 d-flex justify-content-center align-items-center'>
                <input onChange={getTrending} type="text" placeholder='Enter Movie Namev' id='name' className='form-control search-form' />
                <label htmlFor='name' ><button className='btn btn-outline-primary search' ><i class="fa-solid fa-magnifying-glass"></i></button></label>
            </div>
            <div className='row mt-5'>
                {
                    searchItem.map((e, i) => (
                        <div className='col-md-3 ' key={i}>
                            <div className='item'>
                                {e.poster_path ? <img className='w-100' src={"https://image.tmdb.org/t/p/w500" + e.poster_path} alt='movie' />
                                    : <img className='w-100' src="https://images.pexels.com/photos/11872650/pexels-photo-11872650.jpeg?auto=compress&cs=tinysrgb&w=600" alt='movie' />}
                                <h2 className='h6 mt-1'>{e.title}</h2>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </Fragment>
    )
}
export default Search