import { TMDB_API_KEY } from './config'
const BASE_PATH = "https://api.themoviedb.org/3"

export interface Movie {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
interface BaseResponse {
    page: number
    total_results: number
    total_pages: number
}
export interface MovieResponse extends BaseResponse {
    results: Movie[]
}

const trending = () =>
    fetch(`${BASE_PATH}/trending/movie/week?api_key=${TMDB_API_KEY}`).then(res => res.json())

const upcoming = () =>
    fetch(`${BASE_PATH}/movie/upcoming?api_key=${TMDB_API_KEY}&page=1&region=kr`).then(res => res.json())

const nowPlaying = () =>
    fetch(`${BASE_PATH}/movie/now_playing?api_key=${TMDB_API_KEY}&page=1&region=kr`).then(res => res.json())

export const moviesApi = { trending, upcoming, nowPlaying }