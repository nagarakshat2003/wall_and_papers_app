import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Settings = () => {

  const nav = useNavigate()

  useEffect(()=>{
    document.title = 'Settings - Wall&Papers'
  })

  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      nav('/login')
    }
  },[])

  return (
    <div className='h-screen'>Sorry! This page is still under development.</div>
  )
}

export default Settings