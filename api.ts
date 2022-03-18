import { TMDB_API_KEY } from './config'
const BASE_PATH = "https://api.themoviedb.org/3"

const trending = () =>
    fetch(`${BASE_PATH}/trending/movie/week?api_key=${TMDB_API_KEY}`).then(res => res.json())

const upcoming = () =>
    fetch(`${BASE_PATH}/movie/upcoming?api_key=${TMDB_API_KEY}&page=1&region=kr`).then(res => res.json())

const nowPlaying = () =>
    fetch(`${BASE_PATH}/movie/now_playing?api_key=${TMDB_API_KEY}&page=1&region=kr`).then(res => res.json())
