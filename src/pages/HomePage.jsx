import { CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PhotoCard from '../components/PhotoCard'
import axios from 'axios'

const HomePage = () => {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    document.title = 'Wall&Papers'
  }, [])

  useEffect(()=>{
    getData()
  },[])

  const getData = async ()=>{
    setLoading(true)
    await axios.get('https://wall-and-papers-api.onrender.com/wallpaper').then(response=>{
      setList(response.data)
      console.log(list)
    }).catch(error=>{
      console.log(error)
      alert(error.name)
    })
    setLoading(false)
  }

  useEffect(()=>{
    template()
  },[loading])

  const template = ()=>{
    return <>
      {loading?<CircularProgress />:<div className='grid grid-cols-4 gap-5 mb-10'>
        {list && list.map((data)=>{
          return <div  key={data._id} className='flex flex-col border-solid border-2 border-black rounded-lg hover:dark:bg-slate-900 hover:bg-slate-400 cursor-pointer'>
          <PhotoCard id={data._id} path={data.path}/>
          <span>Uploaded by: <span className='font-bold'>{data.uploader}</span></span>
          </div>
        })}
      </div>
      }
    </>
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Typography variant='h4' className='min-w-fit text-center m-10'>Get Exclusive Wallpapers for your Desktop</Typography>
      {template()}
    </div>
  )
}

export default HomePage