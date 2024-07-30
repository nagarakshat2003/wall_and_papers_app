import React, { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Wallpaper = () => {

  const { id } = useParams();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, []);

  const getData = async ()=>{
    setLoading(true)
    await axios.get("https://wall-and-papers-api.onrender.com/wallpaper/" + id).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.log(error);
      alert(error.name);
    });
    setLoading(false)
  }

  const arr = data.path && data.path.split("/");
  const name = arr && arr[arr.length - 1];

  useEffect(()=>{
    document.title = 'Wall&Papers'
  },[])

  const handleDownload = async () => {
    const imageBlob = await fetch(data.path).then(response=>response.blob()).catch(error=>{alert(error.name)})
    console.log(imageBlob,URL.createObjectURL(imageBlob))
    const a = document.createElement('a')
    a.href = URL.createObjectURL(imageBlob)
    a.setAttribute('download', name)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  };

  const template = ()=>{
    return <>{loading?<CircularProgress/>:<div className="w-4/5 m-10">
      <a href={data.path}><img src={data.path} alt={data.path} className="h-auto cursor-pointer"/></a>
    </div>}</>
  }

  return (
    <div className="flex flex-col h-full w-full items-center">
      {template()}
      <div className="flex flex-row justify-between w-4/5">
        <span>Uploaded by: <span className="font-bold">{data.uploader}</span></span>
        <DownloadIcon className="cursor-pointer hover:text-slate-500 size-10 active:text-transparent" onClick={()=>{handleDownload()}}/>
      </div>
    </div>
  )
};

export default Wallpaper;
