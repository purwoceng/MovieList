import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { searchMovie } from '../features/currentGenreOrCategory';

// import { searchMovie } from "../../features/currentGenreOrCategory.js";

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    console.log(query);

    const handleKeyDown = (event) => {
        console.log(event)
        if (event.key === 'Enter') {   
            console.log('Enter')         
            dispatch(searchMovie(query));
        }
    };

    return (
        <div> 
            <TextField 
                onKeyDown={handleKeyDown}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
        
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </div>
    );
};

export default Search;
