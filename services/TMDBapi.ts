import axios from "axios";
import { ApiResponse, Genre, Movie, TvShow } from "../types/types";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Movie>>("/movie/popular");
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchTvShows = async (): Promise<TvShow[]> => {
  try {
    const response = await apiClient.get<ApiResponse<TvShow>>(
      "/trending/tv/day"
    );
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await apiClient.get<Movie>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchTvShowDetails = async (tvShowId: number): Promise<TvShow> => {
  try {
    const response = await apiClient.get<TvShow>(`/tv/${tvShowId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for TV show ID ${tvShowId}:`, error);
    throw error;
  }
};

// Fetch details for a specific movie by ID
export const fetchMovieGenres = async (id: number): Promise<Movie> => {
  try {
    const response = await apiClient.get<Movie>(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${id}:`, error);
    throw error;
  }
};

// Fetch details for a specific TV show by ID
export const fetchTvShowGenres = async (id: number): Promise<TvShow> => {
  try {
    const response = await apiClient.get<TvShow>(`/tv/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for TV show ID ${id}:`, error);
    throw error;
  }
};

import { CreditsResponse } from "@/types/types";

// Fetch cast and crew for a specific movie by ID
export const fetchMovieCredits = async (
  id: number
): Promise<CreditsResponse> => {
  try {
    const response = await apiClient.get<CreditsResponse>(
      `/movie/${id}/credits`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${id}:`, error);
    throw error;
  }
};

// Fetch cast and crew for a specific TV show by ID
export const fetchTvShowCredits = async (
  id: number
): Promise<CreditsResponse> => {
  try {
    const response = await apiClient.get<CreditsResponse>(`/tv/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching credits for TV show ID ${id}:`, error);
    throw error;
  }
};

// Get Latest Movies
export const fetchLatestMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Movie>>(
      "/movie/now_playing"
    );
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    throw error;
  }
};
