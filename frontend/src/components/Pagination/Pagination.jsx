import React from 'react'
import { Typography, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const theme = useTheme()

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1)    
    }
  }
  
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1)    
    }
  }

  if (totalPages === 1) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={handlePrev} sx={{ margin: '30px 2px' }} variant='contained' color='primary' type='button'>Prev</Button>
      <Typography variant='h4' sx={{ margin: '0px 20px !important', color: theme.palette.text.primary }}>{currentPage}</Typography>
      <Button onClick={handleNext} sx={{ margin: '30px 2px' }} variant='contained' color='primary' type='button'>Next</Button>
    </div>
  )
}

export default Pagination