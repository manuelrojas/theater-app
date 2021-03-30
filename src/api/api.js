const API_KEY = 'dbb2339122a0af02f8339e3049248e82';
const API_URL = 'https://api.themoviedb.org/3';

export const IMAGES_PATH = 'https://image.tmdb.org/t/p/w500';
export async function fetchMovies() {
    const resp = fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`);

    return (await resp).json()
}

export function getFilterMoviesByRating(movies, rating, enabled) {
    const range = 2;
    return movies.filter(movie => {
        if(!enabled) return true;
        const max = rating * range;
        const min = max - range;
        return (movie.vote_average <= max) && (movie.vote_average >= min);
    });
}

export async function searchMovies(search) {
    const _search = encodeURIComponent(search);
    const resp = fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${_search}`);

    return (await resp).json()
}