import React, {useState} from 'react'
import { AppBar, Toolbar, IconButton, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'



const NavBar = () => {
    const isMobile = useMediaQuery('(max-width: 600px)')

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '80px',
                    marginLeft: '240px'
                }}>
                    {/* {isMobile && (
                        <IconButton
                            color='inherit'
                            edge='start'
                            style={{ outline: 'none' }}
                            onClick={() => {}}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <IconButton
                        color='inherit'
                        sx={{ ml: 1 }}
                        onClick={() => {}}
                    >
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton> */}

                </Toolbar>
            </AppBar>
            
        </>
    )
}

export default NavBar