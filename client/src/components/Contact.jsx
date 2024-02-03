import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [landlord,setLandlord] = useState(null)
    const [message,setMessage] = useState('')


    const changemsg = (e)=>{
        setMessage(e.target.value)
    }

    useEffect(()=>{
        const fetchLandlord = async()=>{
            try {
                const res = await fetch (`/api/user/${listing.userRef}`)
                const data = await res.json()
                setLandlord(data)

            } catch (error) {
                console.log(error)
            }
        }   
        fetchLandlord()

    },[listing.userRef])

  return (
    <>
    {landlord && (
        <div className='flex flex-col gap-2 font-semibold'>
            <p>Contact <span className='font-bold'>{landlord.username}</span> for <span className='font-bold'>{listing.title.toLowerCase()}</span></p>
            
        <textarea name="message" id="message" rows="2" value={message} onChange={changemsg}
        placeholder='Enter your message here.....' className='w-full border p-3 rounded-lg'
        ></textarea>
        <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.title}&body=${message}`}
        className='bg-zinc-950 text-white text-center p-3 rounded-lg uppercase hover:opacity-80 '
        >Send Message</Link>
        </div>
    )}
    </>
  )
}
