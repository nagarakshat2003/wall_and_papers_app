import React, { useEffect, useState } from 'react'
import { TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const nav = useNavigate()

  useEffect(()=>{
    document.title = 'Login - Wall&Papers'
  },[])

  useEffect(()=>{
    if(localStorage.getItem('token')){
      nav('/profile/'+localStorage.getItem('email'))
    }
  },[])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event)=>{
    axios.post('https://wall-and-papers-api.onrender.com/user/login',{
      email:email,
      password:password
    }).then(response=>{
      console.log(response)
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('email',response.data._email)
      localStorage.setItem('name',response.data.username)
      nav('/profile/'+email)
    }).catch(error=>{
      console.log(error)
      alert(error.response.data.message)
    })
  }

  return (
    <Box component='form' className='min-h-screen flex flex-col justify-center items-center gap-5'>
      <Typography variant='h4' className='min-w-fit text-center m-10'>Login to post your wallpapers and make them available to all</Typography>
      <TextField id="outlined-basic" label="E-mail" variant="filled" type='email' onChange={(event)=>{setEmail(event.target.value)}}/>
      <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="filled" onChange={(event)=>{setPassword(event.target.value)}}/>
      <Button variant="text" onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default Login