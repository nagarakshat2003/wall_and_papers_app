import React, { useEffect, useState } from 'react'
import { TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Form, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

  const nav = useNavigate()

  useEffect(()=>{
    document.title = 'SignUp - Wall&Papers'
  })

  useEffect(()=>{
    if(localStorage.getItem('token')){
      nav('/profile/'+localStorage.getItem('email'))
    }
  },[])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event)=>{
    console.log(name,email,password)
    axios.post('https://wall-and-papers-api.onrender.com/user/sign-up',{
      username:name,
      email:email,
      password:password
    }).then(response=>{
      console.log(response)
      alert('Sign Up successful! Login to continue.')
      nav('/login')
    }).catch(error=>{
      console.log(error)
      alert(error.name+' Registration Failed! Try again')
    })
  }

  return (
    <Box component='form' className='min-h-screen flex flex-col justify-center items-center gap-5'>
      <Typography variant='h4' className='min-w-fit text-center m-10'>Sign Up to contribute your creativity</Typography>
      <TextField id="outlined-basic" label="Name" variant="filled" type='text' onChange={(event)=>{setName(event.target.value)}}/>
      <TextField id="outlined-standard" label="E-mail" variant="filled" type='email' onChange={(event)=>{setEmail(event.target.value)}}/>
      <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="filled" onChange={(event)=>{setPassword(event.target.value)}}/>
      <Button variant="text" onClick={handleSubmit}>Sign Up</Button>
    </Box>
  )
}

export default SignUp