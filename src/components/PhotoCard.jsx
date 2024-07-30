import React from 'react'
import { useNavigate } from 'react-router-dom'

const PhotoCard = (props) => {

  const nav = useNavigate()

  return (
    <div className='flex flex-col border-solid border-2 border-black rounded-lg hover:dark:bg-slate-900 hover:bg-slate-200 cursor-pointer' onClick={()=>{nav(`/wallpaper/${props.id}`)}}>
      <img src={props.path} alt={props.path} className='h-40'/>
    </div>
  )
}

export default PhotoCard