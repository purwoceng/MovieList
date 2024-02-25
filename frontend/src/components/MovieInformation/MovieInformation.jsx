import React, { useState, useEffect } from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useGetMovieQuery, useGetRecomendationsQuery } from '../../services/TMDB'
import { useTheme } from '@mui/material/styles'
import genreIcons from "../../assets/genres";
import { MovieList } from '..'
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";


// import useStyles from './styles'

const MovieInformation = () => {
  const theme = useTheme()
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const isMovieFavorited = false;
  const isMovieWatchlisted = false;
  const addToFavorites = () => {

  }

  const addToWatchlist = () => {

  }

  const { id } = useParams()
  const { data, isFetching, error } = useGetMovieQuery(id)
  const { data: recommendations, isFetching: isRecomendationsFetching } = useGetRecomendationsQuery({ list: 'recommendations', movie_id: id });
  console.log(recommendations)

  if (isFetching) {
    return (<Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size="8rem" />
    </Box>)
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    )
  }

  return (

    <Grid container
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        // xs
        [theme.breakpoints.down("sm")]: {
          flexDirection: 'column',
          flexWrap: 'wrap'
        },
      }}
    >
      <Grid item sm={12} lg={4} xl={3} sx={{
        [theme.breakpoints.down('lg')]: {
          display: 'flex',
          justifyContent: 'center',
        }
      }} >
        <Box
          component="img"
          sx={{
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
            width: '100%',
            [theme.breakpoints.down('lg')]: {
              width: '50%',
              // height: '350px',
              marginBottom: '50px',
              mx: 'auto',
            },
            // [theme.breakpoints.down('md')]: {
            //   width: '60%',
            //   // height: '350px',
            //   marginBottom: '50px',
            //   mx: 'auto',
            // },
            // xs
            [theme.breakpoints.down("sm")]: {
              mx: 'auto',
              width: '50%',
              // height: '350px',
              marginBottom: '30px',
            },
          }}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />

      </Grid>
      <Grid item container direction={"column"} xs={12} sm={12} lg={7}>
        <Typography variant="h3" align="center" gutterBottom>{data?.title} ({data?.release_date.split('-')[0]})</Typography>
        <Typography variant="h5" align="center" gutterBottom>{data?.tagline}</Typography>
        <Grid item
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '10px 0 !important',
            // xs
            [theme.breakpoints.down("sm")]: {
              flexDirection: 'column',
              flexWrap: 'wrap'
            },
          }}
        >
          <Box display="flex" align="center"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center', // Horizontally center the content
              textAlign: 'center', // Center text
              // vertically align the content
              justifyContent: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            <Rating readOnly value={data?.vote_average / 2} precision={0.1} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average} / 10</Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>{data?.runtime} min | {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ''}</Typography>
        </Grid>
        <Grid item
          sx={{
            margin: '10px 0 !important',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            flexDirection: 'row !important',
          }}
        >
          {data?.genres.map((genre, i) => (

            // MASIH BELUM BERES
            // HARUSNYA ICON DAN NAMA GENRE SEBELAHAN BUKAN ATAS-BAWAH
            // KALO KLIK LOGO BELUM BALIK KE HOME TAPI KALO onClick={()=>dispatch(selectGenreOrCategory(genre.id))} DIHAPUS BARU BISA BALIK KE HOME
            <Box component={Link} key={genre.i} to={`/`} onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                [theme.breakpoints.down("sm")]: {
                  padding: '0.5rem 1rem',
                }
              }}
            >
              <Box
                component={'img'}
                src={genreIcons[genre.name.toLowerCase()]}
                sx={{
                  filter:
                    theme.palette.mode === "dark" && "invert(1)",
                  marginRight: "10px",
                }}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1" >
                {genre.name}
              </Typography>
            </Box>
          ))}
        </Grid>


        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom >Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, i) => (
            character.profile_path && <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} style={{ width: '100%', maxWidth: '7rem', height: '8em', borderRadius: '10px', objectFit: 'cover' }} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character.character.split('/')[0]}</Typography>
            </Grid>
          )).splice(0, 6)}
        </Grid>
        <Grid item container sx={{ marginTop: '2rem' }}>
          <Grid item xs={12} sm={6} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            [theme.breakpoints.down("sm")]: {
              flexDirection: 'column',
            }
          }}>
            <ButtonGroup size="small" variant="outlined">
              <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
              <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMBD</Button>
              <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>
                Trailer
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={6} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            [theme.breakpoints.down("sm")]: {
              flexDirection: 'column',
            }
          }}
          >
            <ButtonGroup size="small" variant="outlined" sx={{ '& > * + *': { marginLeft: '8px' } }}>
              <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                {isMovieFavorited ? 'UnFavorite' : 'Favorites'}
              </Button>
              <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                Watchlist
              </Button>
              <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                <Typography style={{ textUnderLine: "none", textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="su">
                  Back
                </Typography>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry there are no recommended movies</Box>}
      </Box>
      {console.log(data)}
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {data?.videos?.results?.length > 0 && (
          <Box
            component={"iframe"}
            autoPlay
            frameborder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
            allowfullscreen
            sx={{
              width: '50%',
              height: '50%',
              [theme.breakpoints.down("sm")]: {
                width: '100%',
                height: '100%',
              },
            }}
          />
        )}
      </Modal>
    </Grid>
  )
}

export default MovieInformation