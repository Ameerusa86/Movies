// pages/MoviesPage.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Movie } from "@/types/types";
import { fetchMovies } from "@/services/TMDBapi";
import Card from "@/components/Card";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#F5C518" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-primary"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Header */}
      <View className="px-4 py-6 items-center bg-primary">
        <Text className="text-clean text-3xl font-bold">Movies</Text>
        <Text className="text-secondary text-base mt-1">
          Explore popular movies
        </Text>
      </View>

      {/* Movies Grid */}
      <View className="flex flex-row flex-wrap justify-between px-4">
        {movies.map((movie) => (
          <View
            key={movie.id}
            style={{ width: "48%", marginBottom: 16 }} // Two columns
          >
            <Card item={movie} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MoviesPage;
