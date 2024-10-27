// components/Card.tsx

import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Movie, TvShow } from "../types/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("window").width;

interface CardProps {
  item: Movie | TvShow; // Accepts a single movie or TV show
}

// Type guard to check if the item is a Movie
const isMovie = (item: Movie | TvShow): item is Movie => {
  return (item as Movie).title !== undefined;
};

const Card: React.FC<CardProps> = ({ item }) => {
  const imageUrl = item.poster_path || item.backdrop_path || "";

  return (
    <GestureHandlerRootView
      style={{
        width: screenWidth / 2 - 16, // Two columns with margin
      }}
      className="bg-secondary rounded-lg p-2 mb-4"
    >
      <Link
        href={{
          pathname: "/[id]",
          params: {
            id: item.id.toString(),
            type: isMovie(item) ? "movie" : "tv",
            title: isMovie(item) ? item.title : item.name,
            year: isMovie(item)
              ? item.release_date?.substring(0, 4)
              : item.first_air_date?.substring(0, 4) ?? "N/A",
            poster: imageUrl,
            rating: item.vote_average.toString().substring(0, 3),
            plot: item.overview,
          },
        }}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${imageUrl}` }}
          className="rounded-lg bg-gray-400 w-full"
          style={{ height: 200 }}
        />
        <View className="flex items-center justify-center mt-2">
          <Text
            className="text-clean font-semibold text-md text-center"
            numberOfLines={1}
          >
            {isMovie(item) ? item.title : item.name}
          </Text>
          <Text
            className="text-clean font-semibold text-sm text-center mt-1"
            numberOfLines={1}
          >
            {isMovie(item)
              ? item.release_date?.substring(0, 4)
              : item.first_air_date?.substring(0, 4)}
          </Text>
        </View>
      </Link>
    </GestureHandlerRootView>
  );
};

export default Card;
