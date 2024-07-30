import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PhotoCard from '../components/PhotoCard'
import DeleteIcon from '@mui/icons-material/Delete';
import Add from '../components/Add';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {

  const nav = useNavigate()

  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const name = localStorage.getItem('name')

  useEffect(()=>{
    if(!token){
      nav('/login')
    }
  },[])

  useEffect(()=>{
    document.title = name + ' - Wall&Papers'
  }, [])

  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  },[])

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async ()=>{
    setLoading(true)
    await axios.get('https://wall-and-papers-api.onrender.com/wallpaper/profile/'+email,{
      headers:{
        Authorization: 'Bearer '+token
      }
    }).then(response=>{
      setList(response.data)
      console.log(list)
    }).catch(error=>{
      console.log(error)
      alert(error.name)
    })
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])

  const deleteHandle = (id, path)=>{
    if(window.confirm('Are you sure you want to delete this wallpaper?')){
      axios.delete(`https://wall-and-papers-api.onrender.com/wallpaper/?id=${id}&path=${path}`,{
        headers:{
          Authorization: 'Bearer '+token
        }
      }).then(response=>{
        console.log(response)
        getData()
      }).catch(error=>alert(error.name))
    }
  }

  const template = ()=>{
    return <>{list && list.map((data)=>{
      return <div  key={data._id} className='flex flex-col items-end rounded-lg hover:dark:bg-slate-900 hover:bg-slate-400 cursor-pointer'>
        <PhotoCard id={data._id} path={data.path}/>
        <DeleteIcon className='cursor-pointer hover:text-slate-500 active:text-transparent' onClick={()=>deleteHandle(data._id,data.path)}/>
      </div>
    })}</>
  }

  useEffect(()=>{
    template()
  },[loading])

  return (
    <div className='min-h-screen place-content-center flex flex-col justify-center items-center gap-10 p-10'>
      <Typography variant='h3'>
        {name}
      </Typography>
      <Typography>
        {email}
      </Typography>
      <div className='grid grid-cols-4 gap-5'>
        {template()}
        <Add />
      </div>
    </div>
  )
}

export default Profile