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
export interface TV {
    name: string;
    original_name: string;
    origin_country: string[];
    vote_count: number;
    backdrop_path: string | null;
    vote_average: number;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    poster_path: string | null;
    first_air_date: string;
    popularity: number;
    media_type: string;
}
interface BaseResponse {
    page: number
    total_results: number
    total_pages: number
}
export interface MovieResponse extends BaseResponse {
    results: Movie[]
}

export const moviesApi = {
    trending: () =>
        fetch(`${BASE_PATH}/trending/movie/week?api_key=${TMDB_API_KEY}`).then(res => res.json()),
    //@ts-ignore
    upcoming: ({ pageParam }) =>
        fetch(`${BASE_PATH}/movie/upcoming?api_key=${TMDB_API_KEY}&page=${pageParam}`).then(res => res.json()),
    nowPlaying: () =>
        fetch(`${BASE_PATH}/movie/now_playing?api_key=${TMDB_API_KEY}&page=1&region=kr`).then(res => res.json()),
    //@ts-ignore
    search: ({ queryKey }) => {
        const [_, query] = queryKey
        return fetch(`${BASE_PATH}/search/movie?api_key=${TMDB_API_KEY}&page=1&query=${query}`).then(res => res.json())
    },
    //@ts-ignore
    detail: ({ queryKey }) => {
        const [_, id] = queryKey
        return fetch(`${BASE_PATH}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images`).then(res => res.json())
    }
}

export const tvApi = {
    trending: () =>
        fetch(`${BASE_PATH}/trending/tv/week?api_key=${TMDB_API_KEY}`).then(res => res.json()),
    airingToday: () =>
        fetch(`${BASE_PATH}/tv/airing_today?api_key=${TMDB_API_KEY}&page=1&region=kr`).then(res => res.json()),
    topRated: () =>
        fetch(`${BASE_PATH}/tv/top_rated?api_key=${TMDB_API_KEY}&page=1&region=kr`).then(res => res.json()),
    //@ts-ignore
    search: ({ queryKey }) => {
        const [_, query] = queryKey
        return fetch(`${BASE_PATH}/search/tv?api_key=${TMDB_API_KEY}&page=1&query=${query}`).then(res => res.json())
    },
    //@ts-ignore
    detail: ({ queryKey }) => {
        const [_, id] = queryKey
        return fetch(`${BASE_PATH}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images`).then(res => res.json())
    }
}