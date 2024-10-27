// components/MovieCard.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import { MovieCardProps } from "../types/types";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <View className="w-32 h-48 mr-4 bg-gray-800 rounded-lg shadow-lg">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{
          width: "100%",
          height: 160,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        resizeMode="cover"
      />
      <Text
        className="text-white text-sm font-semibold mt-2 text-center px-1"
        numberOfLines={1}
      >
        {movie.title}
      </Text>
    </View>
  );
};

export default MovieCard;
