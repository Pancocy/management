import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Blank() {
    const navigate =useNavigate()
    useEffect(()=>{
        navigate('/role')
    },[])
    return (
        <div></div>
    )
}
