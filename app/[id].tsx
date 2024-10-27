// pages/Details.tsx

import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  fetchMovieDetails,
  fetchTvShowDetails,
  fetchMovieCredits,
  fetchTvShowCredits,
} from "@/services/TMDBapi";
import { Movie, TvShow, CreditsResponse, Genre } from "@/types/types";
import CastList from "@/components/CastList";
import TabsSelector from "@/components/TabsSelector";

const Details = () => {
  const { id, type, title, poster, rating, year, description } =
    useLocalSearchParams();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        let details, creditsData;
        if (type === "movie") {
          details = await fetchMovieDetails(Number(id));
          creditsData = await fetchMovieCredits(Number(id));
        } else if (type === "tv") {
          details = await fetchTvShowDetails(Number(id));
          creditsData = await fetchTvShowCredits(Number(id));
        }

        if (details && details.genres) {
          setGenres(details.genres);
        }
        if (creditsData) {
          setCredits(creditsData);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id, type]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center text-white bg-primary">
        <ActivityIndicator size="large" color="#F5C518" />
      </View>
    );
  }

  const tabs = [
    {
      title: "Trailers",
      content: (
        <Text className="text-gray-300">Trailers content goes here.</Text>
      ),
    },
    {
      title: "More Like This",
      content: (
        <Text className="text-gray-300">
          Similar movies/shows content goes here.
        </Text>
      ),
    },

    {
      title: "Cast",
      content: credits ? (
        <CastList cast={credits.cast} />
      ) : (
        <Text className="text-gray-300">No Cast Available</Text>
      ),
    },
  ];

  return (
    <ScrollView className="bg-primary flex-1">
      {/* Poster Header */}
      <View className="relative">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${poster}` }}
          style={{ height: 400 }}
          className="w-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black bg-opacity-40" />
        <View className="absolute top-10 left-4">
          <Feather name="arrow-left" size={24} color="white" />
        </View>
      </View>

      {/* Details Section */}
      <View className="px-4 py-6">
        <View className="flex-row items-center gap-4">
          <FontAwesome name="imdb" size={28} color="#F5C518" />
          <Text className="text-white font-bold text-lg">{rating}</Text>
        </View>
        <Text className="text-white text-3xl font-bold mt-4">{title}</Text>
        <View className="flex-row mt-4 gap-2 flex-wrap">
          <Text className="bg-secondary text-clean rounded-full px-2 py-1 text-xs">
            {year}
          </Text>
          {genres.map((genre) => (
            <Text
              key={genre.id}
              className="bg-secondary text-clean rounded-full px-2 py-1 text-xs"
            >
              {genre.name}
            </Text>
          ))}
        </View>

        {/* Description */}
        <Text className="text-gray-300 mt-4">{description}</Text>

        {/* Tabs Section with Cast Tab */}
        <TabsSelector tabs={tabs} />
      </View>
    </ScrollView>
  );
};

export default Details;
