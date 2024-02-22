import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = "e14104f5929fe7a58118c33246c8b05f";


export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovies: builder.query({
      query: (genreIdOrCategoryName, page) =>{
        //* Get Movies by Search
        if(searchQuery){
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Movies by Category
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === "string"){
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`; 
        }

        //* Get Movies by Genre
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === "number"){
           return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`; 
        }
        
        //* Get Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
