import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

const ItemDetails = () => {
    let [itemDetails, setItemDetails] = useState({})
    let params = useParams()
    let getItemDetails = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_Type}/${params.id}?api_key=b44e5bbfa6921b60c1a1e3941df29c03`)
        setItemDetails(data)
        console.log(params)
    }
    useEffect(() => {
        getItemDetails()
    })
    console.log(itemDetails.homepage)
    return<>
  <Helmet>
                <meta charSet="utf-8" />
                <title>{itemDetails.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <div className='row my-3'>
            <div className='col-md-4'>
                {
                    itemDetails.profile_path ? <img className='w-100' src={"https://image.tmdb.org/t/p/w500" + itemDetails.profile_path} alt='movie' />
                        : <img className='w-100' src={"https://image.tmdb.org/t/p/w500" + itemDetails.poster_path} alt='movie' />
                }
            </div>
            <div className='col-md-8'>
                <h2 className='text-light'>{itemDetails.name}{itemDetails.title}</h2>
                <div>
                </div>
                {
                    itemDetails.vote_average ?
                        (
                            <Fragment>
                                <h5 className='mb-3'>vote : {itemDetails.vote_average}</h5>
                                <h5 className='mb-3'>vote count : {itemDetails.vote_count}</h5>
                                <h5 className='mb-3'>popularity : {itemDetails.popularity}</h5>
                                <h5 className='mb-3'>release date : {itemDetails.release_date}</h5>
                                <a href={itemDetails.homepage} className="nav-link btn btn-info px-4 py-1 text-light mb-3 source" style={{ width: "100px" }}>source</a>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <h5 className='mb-3'>department : {itemDetails.known_for_department}</h5>
                                <h5 className='mb-3'>popularity : {itemDetails.popularity}</h5>
                                <h5 className='mb-3'>place of birth : {itemDetails.place_of_birth}</h5>
                            </Fragment>
                        )
                }
                <p className='text-muted'>{itemDetails.overview}{itemDetails.biography}</p>
            </div>
        </div>
        </>
}

export default ItemDetails