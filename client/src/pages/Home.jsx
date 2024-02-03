import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Swiper,SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle'
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings,setOfferListings] = useState([])
  const [rentListings,setRentListings] = useState([])
  const [saleListings,setSaleListings] = useState([])
  SwiperCore.use([Navigation])

  useEffect(()=>{
    const fetchOfferListings =async()=>{
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=3')
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings =async()=>{
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=3')
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings=async()=>{
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=3')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()
  },[])
  return (
    <div>
      {/*top*/}
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-800 font-bold text-3xl lg:text-6xl'>
          Unlock your dream <span className='text-slate-400'>home</span> 
          <br />
          explore possibilities with us!
          </h1>
          <div className='text-gray-500 text-xs sm:text-sm font-semibold'>
          Elevate your living experience with Casa Catalyst - where homes turn into vibrant catalysts for a life well-lived.
          <br />
          Explore our diverse portfolio, offering a spectrum of properties tailored to match your unique preferences and aspirations.
          </div>
          <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's kick things off.....
          </Link>
        </div>
      {/*swiper*/}

        <Swiper navigation>
          {
            offerListings && offerListings.length > 0 && offerListings.map((listing)=>(
              <SwiperSlide>
                <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:'cover'}} className='h-[500px]' key={listing._id}>

                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>

      {/*offers,rent,sale*/}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {
            offerListings && offerListings.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-slate-800 font-bold text-2xl'>Latest offers</h2>
                  <Link className='text-sm text-blue-800 font-bold hover:underline' to={'/search?offer=true'}>
                    Show more offers
                  </Link>
                </div>
                <div className='flex flex-wrap gap-12'>
                  {offerListings.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))}
                </div>
              </div>
            )
          }
          {
            rentListings && rentListings.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-slate-800 font-bold text-2xl'>Recent places for rent</h2>
                  <Link className='text-sm text-blue-800 font-bold hover:underline' to={'/search?type=rent'}>
                    Show more places
                  </Link>
                </div>
                <div className='flex flex-wrap gap-12'>
                  {rentListings.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))}
                </div>
              </div>
            )
          }
          {
            saleListings && saleListings.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-slate-800 font-bold text-2xl'>Recent places for sale</h2>
                  <Link className='text-sm text-blue-800 font-bold hover:underline' to={'/search?type=sale'}>
                    Show more places
                  </Link>
                </div>
                <div className='flex flex-wrap gap-12'>
                  {saleListings.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))}
                </div>
              </div>
            )
          }
      </div>
    </div>
  )
}
