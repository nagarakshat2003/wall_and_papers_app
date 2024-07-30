import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const Add = () => {

  const nav = useNavigate()

  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const name = localStorage.getItem('name')

  const [image, setImage] = useState();

  const [uploading, setUploading] = useState(false)

  const inputFile = useRef(null);

  const handleFileUpload = async (event) => {
    event.preventDefault()
    const { files } = event.target;
    if (files && files.length) {
      setImage(files[0]);
      console.log("Upload in process",image)
      setUploading(true)
      const data = new FormData()
      data.append('uploader',name)
      data.append('email',email)
      data.append('photo',image)
      
      await axios.post('https://wall-and-papers-api.onrender.com/wallpaper',data,{
        headers:{
          Authorization: 'Bearer '+token,
        }
      }).then((response)=>{
        console.log(response)
        window.location.reload()
      }).catch(error=>{
        console.log(error)
        alert(error.name)
      })
      setUploading(false)
    }
  }

  const onButtonClick = () => {
    inputFile.current.click();
  }

  useEffect(()=>{
    addButton()
  },[uploading])

  const addButton = ()=>{
    return <>{uploading ? <CircularProgress /> : <AddIcon className="text-6xl" />}</>
  }

  return (
    <div className="flex items-center justify-center border-solid border-2 border-black rounded-lg hover:bg-slate-400 cursor-pointer active:text-transparent" onClick={onButtonClick}>
      <input
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      {addButton()}
    </div>
  );
};

export default Add;
