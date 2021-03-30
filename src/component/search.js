import React, {useState} from 'react'
import {useQuery} from 'react-query';
import { fetchMovies, IMAGES_PATH, searchMovies, getFilterMoviesByRating } from '.././api/api';
import Image from 'material-ui-image';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MovieRating from './rating';
import DetailDialog from './dialog';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: '#FFF',
        width: '100%',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
      },
  }));
 

export default function Search () {
    const classes = useStyles();
    const [movie, setMovie] = useState('');
    const [detail, openDetail] = useState(false);
    const [rating, setRating] = useState(4);
    const [currentMovie, setCurrentMovie] = useState();
    const isEmptySearch = (movie === '');

    const { data: discover } = useQuery([], () => fetchMovies(), { enabled: isEmptySearch });
    const { data: movies } = useQuery([movie], () => searchMovies(movie), { enabled:  !isEmptySearch });
    const data = movies || discover;

    return (
        <div className={classes.container}>
            <div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        onChange={e => setMovie(e.target.value)} 
                        classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                { !isEmptySearch && <MovieRating value={rating} onChange={setRating} /> }
          </div>
            <Grid container spacing={3}>
                { data && data.results && getFilterMoviesByRating(data.results, rating, !isEmptySearch).map(item => 
                        <Grid key={item.id} item xs={6} md={3} sm={2}>
                              <Link href="#" onClick={() => {
                                  setCurrentMovie(item);
                                  openDetail(true);
                              }}>
                                <Paper className={classes.paper} elevation={3}>
                                    <Image
                                        src={`${IMAGES_PATH}${item.poster_path}`}
                                    />
                                    <Typography component="legend">Rating {item.vote_average}</Typography>
                                </Paper>
                            </Link>
                    </Grid>
                )}
            </Grid>
            <DetailDialog 
                open={detail} 
                handleClickOpen={() => openDetail(true) }  
                handleClose={() => openDetail(false) }  
                movie={currentMovie}
            />
   
        </div>
    )
  
}

