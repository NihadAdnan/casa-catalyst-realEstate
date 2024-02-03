import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    furnished: false,
    parking: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading,setLoading] = useState(false)
  const [listings,setListings] = useState([])
  const [showMore,setShowMore] = useState(false)

  const navigate = useNavigate()


  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if(
        searchTermFromUrl ||
        typeFromUrl ||
        furnishedFromUrl ||
        parkingFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
    ) {
        setSideBarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
        })
    }

    const fetchListings=async()=>{
        setLoading(true)
        setShowMore(false)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data)
        setLoading(false)
    }
    fetchListings()

  },[location.search])

  const handleChange = (e) => {
    if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale' ){
        setSideBarData({
            ...sideBarData, type:e.target.id
        })
    }
    if(e.target.id === 'searchTerm'){
        setSideBarData({
            ...sideBarData, searchTerm:e.target.value
        })
    }
    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
        setSideBarData({    
            ...sideBarData,  [e.target.id]:e.target.checked || e.target.checked === 'true' ? true : false 
        })
    }
    if(e.target.id === 'sort_order'){
        const sort = e.target.value.split('_')[0] || 'created_at';
        const order = e.target.value.split('_')[1] || 'desc';
        setSideBarData({
            ...sideBarData,sort,order
        })
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm',sideBarData.searchTerm)
    urlParams.set('type',sideBarData.type)
    urlParams.set('parking',sideBarData.parking)
    urlParams.set('furnished',sideBarData.furnished)
    urlParams.set('offer',sideBarData.offer)
    urlParams.set('sort',sideBarData.sort)
    urlParams.set('order',sideBarData.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)

  }

  const showMoreOnClick=async()=>{
    const numberOfListings = listings.length
    const startIndex = numberOfListings
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex',startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/listing/get?${searchQuery}`)
    const data = await res.json()
    if (data.length < 9){
      setShowMore(false)
    }
    setListings([
      ...listings,
      ...data
    ]
      
    )
  }

  return (
    <div className="flex flex-col md:flex-row font-semibold">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-bold">
              Search Keyword:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search....."
              className="border rounded-lg p-3 w-full"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" checked={sideBarData.type==='all'} onChange={handleChange}/>
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" checked={sideBarData.type==='rent'} onChange={handleChange}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" checked={sideBarData.type==='sale'} onChange={handleChange}/>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" checked={sideBarData.offer} onChange={handleChange}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" checked={sideBarData.parking} onChange={handleChange}/>
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" checked={sideBarData.furnished} onChange={handleChange}/>
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-bold">Sort:</label>
            <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className="border rounded-lg p-3">
              <option value='createdAt_desc' className="text-center">Latest</option>
              <option value='createdAt_asc' className="text-center">Oldest</option>
              <option value='regularPrice_desc' className="text-center">Price high to low</option>
              <option value='regularPrice_asc' className="text-center">Price low to high</option>
            </select>
          </div>
          <button className="bg-zinc-950 text-white p-3 rounded-lg uppercase hover:opacity-80">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-3xl border-b p-3 mt-5">
          Search results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 && (
                <p className="text-xl text-slate-950  mt-7">No result found!</p>
            )}
            {loading && (
                <p className="text-xl text-slate-950 text-center w-full">Loading.....</p>
            )}
            {
                !loading && listings && listings.map((listing)=>(
                    <ListingItem key={listing._id} listing={listing}/>
                ))
            }
            {
              showMore && (
                <button onClick={showMoreOnClick} className="text-green-700 hover:underline p-7 text-center w-full font-bold">Show More</button>
              )
            }
        </div>
      </div>
    </div>
  );
}
