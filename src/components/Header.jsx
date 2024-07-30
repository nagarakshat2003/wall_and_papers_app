import React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Switch } from '@mui/material';
import {  useTheme } from '../contexts/ThemeContext';
import {useNavigate} from 'react-router-dom'


const Header = () => {

  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const name = localStorage.getItem('name')

  const [anchorEl, setAnchorEl] = useState(null);

  const nav = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {themeMode, darkTheme, lightTheme} = useTheme()

  const themeSwitch = (e)=>{
    const status = e.target.checked
    if(status){
      darkTheme()
    }else{
      lightTheme()
    }
  }

  return (
    <AppBar position="static" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
      <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }} className='cursor-pointer' onClick={()=>{nav('/')}}>
          Wall&Papers
        </Typography>
        <Switch checked={themeMode==='dark'} onChange={themeSwitch}/>
        <div>
          <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
            <AccountCircle/>
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }} keepMounted transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }} open={Boolean(anchorEl)} onClose={handleClose}>
            {token?<MenuItem onClick={()=>{nav(`/profile/${email}`);setAnchorEl(null)}}>{name}</MenuItem>:<></>}
            {!token?<MenuItem onClick={()=>{nav('/login');setAnchorEl(null)}}>Login</MenuItem>:<></>}
            {/* {token?<MenuItem onClick={()=>{nav('/settings');setAnchorEl(null)}}>Settings</MenuItem>:<></>} */}
            {!token?<MenuItem onClick={()=>{nav('/sign-up');setAnchorEl(null)}}>Sign Up</MenuItem>:<></>}
            {token?<MenuItem onClick={()=>{localStorage.clear();nav('/')}}>Logout</MenuItem>:<></>}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header