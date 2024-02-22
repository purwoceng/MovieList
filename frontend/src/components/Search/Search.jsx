import React,{useState, useEffect} from 'react'
import {TextFiels, InputAdornment} from '@mui/material'
import {Search as SearchIcon} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

import {searchMovie} from '../../features/currentGenreOrCategory'
 

const Search = () => {
    const classes = useStyles()
    const [query, setQuery] = useState('')
    console.log('Search')
    const dispatch = useDispatch()

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {            dispatch(searchMovie(query))
        }
    }

    return (
        <div className={classNames.searchContainer}> 
            <TextField 
                onKeyPress={handleKeyPress}
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    className: classes.input,
                    startAdornment:(
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default Search