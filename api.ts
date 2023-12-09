const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzMzODZmZmViNmEzMjYwNWNhZjZjNTkxNjgyYzhkZiIsInN1YiI6IjY0ZWRiNDAzMWZlYWMxMDBmZTVlOWFmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9PCq8HvT1NH--3nflfYRPTa2ZCqZf-q3tDsGDS5zNkg";
const API_KEY = "073386ffeb6a32605caf6c591682c8df";
const BASE_URL = "https://api.themoviedb.org/3/movie/"

export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number;
}

export interface TV extends Movie {
    original_name: string,
}

interface BaseResponse {
    pages: number;
    total_pages: number;
    total_results: number;
}

export interface MovieResponse extends BaseResponse {
    results: Movie[];
}

export const moviesApi = {
    nowPlaying: () => {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        };
    
        return fetch(`${BASE_URL}now_playing?language=en-US&page=1`, {headers})
        .then((response) => {
            if (response) {
                return response.json();
            }
        })
    },
    upComing: () => {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        };
    
        return fetch(`${BASE_URL}upcoming?language=en-US&page=1`, {headers})
        .then((response) => {
            if (response) {
                return response.json();
            }
        })
    },
    trending: () => {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        };
    
        return fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, {headers})
        .then((response) => {
            if (response) {
                return response.json();
            }
        })
        .catch((error)=>{
            console.error("trending", error);
            console.log(error);
        })
    },
    search: ({queryKey}) => {
        const [_, query] = queryKey;
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
        return fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`, {headers})
        .then((response) => {
            if (response) {
                return response.json();
            }
        })
        .catch((error)=>{
            console.error("trending", error);
            console.log(error);
        })
    },
    detail: ({queryKey}) => {
        const [_, id] = queryKey;
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
        return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-U`, {headers})
        .then((response) => {
            if (response) {
                return response.json();
            }
        })
        .catch((error)=>{
            console.error("trending", error);
            console.log(error);
        })
    },
}

export const tvApi = {
    airingToDay: () => {
        const  headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        return fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', {headers})
        .then((response)=>{
            if (response) {
                return response.json();
            }
        })
    },
    trending: () => {
        const  headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        return fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {headers})
        .then((response)=>{
            if (response) {
                return response.json();
            }
        })
    },
    topRated: () => {
        const  headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        return fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', {headers})
        .then((response)=>{
            if (response) {
                return response.json();
            }
        })
    },
    search: ({queryKey}) => {
        const [_, query] = queryKey;
        console.log(query)
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
        return fetch(`https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1&query=${query}`, {headers})
        .then((response) => {
            if (response) {
                return response.json();
            }
        })
        .catch((error)=>{
            console.error("trending", error);
            console.log(error);
        })
    },
    detail: ({queryKey}) => {
        const [_, id] = queryKey;
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
        return fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-U`, {headers})
        .then((response) => {
            if (response) {
                return response.json();
            }
        })
        .catch((error)=>{
            console.error("trending", error);
            console.log(error);
        })
    },
}