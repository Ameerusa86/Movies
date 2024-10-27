// app/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Movie } from "../../types/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CarouselComponent from "@/components/Carousel";
import { fetchLatestMovies } from "@/services/TMDBapi";

const { width: screenWidth } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [mainImage, setMainImage] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestMovies = async () => {
      try {
        const latestMoviesData = await fetchLatestMovies();

        if (latestMoviesData && latestMoviesData.length > 0) {
          setLatestMovies(latestMoviesData);
          setMainImage(latestMoviesData[0]); // Set the first movie as the main image
        } else {
          console.log("No movies data received.");
        }
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLatestMovies();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-clean text-lg">Loading...</Text>
      </View>
    );
  }

  if (!mainImage) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-clean text-lg">No movies available.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-primary"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Header Section */}
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original${mainImage.poster_path}`,
        }}
        style={{ width: screenWidth, height: 420 }}
        className="relative bg-cover bg-center"
      >
        {/* Movie Info */}
        <View className="absolute bottom-12 left-4 right-4">
          <View className="flex-row items-center mb-3">
            <FontAwesome name="imdb" size={24} color="#F5C518" />
            <Text className="text-clean font-semibold ml-2 text-lg">
              {mainImage.vote_average.toFixed(1)}
            </Text>
          </View>
          <Text className="text-clean text-3xl font-bold mb-3">
            {mainImage.title}
          </Text>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="bg-blue-500 rounded-full py-2 px-6 flex-row items-center">
              <Text className="text-clean text-lg font-semibold">
                Watch Now
              </Text>
            </TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#F8F9FA" />
          </View>
        </View>
      </ImageBackground>

      {/* Thumbnail Carousel to Change Main Image */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6 pl-4"
        contentContainerStyle={{ alignItems: "center" }}
      >
        {latestMovies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => setMainImage(movie)}
            className="mr-4"
          >
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={{ width: 80, height: 120 }}
              className={`rounded-lg overflow-hidden ${
                mainImage.id === movie.id ? "border-2 border-blue-500" : ""
              }`}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Carousel Section */}
      <Text className="text-clean text-xl font-bold mt-6 ml-4">
        Latest Movies
      </Text>
      <CarouselComponent data={latestMovies} />

      {/* For You Section */}
      <View className="flex-row justify-between items-center mx-4 mt-8">
        <Text className="text-clean text-xl font-bold">For You</Text>
        <Text className="text-blue-500 font-semibold">See All</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 pl-4"
        contentContainerStyle={{ alignItems: "center" }}
      >
        {latestMovies.map((movie) => (
          <View key={movie.id} className="mr-4 bg-secondary p-2 rounded-lg">
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={{ width: 120, height: 180 }}
              className="rounded-lg overflow-hidden"
            >
              <View className="absolute top-2 left-2 flex-row items-center">
                <FontAwesome name="imdb" size={18} color="#F5C518" />
                <Text className="text-clean font-semibold ml-1 text-xs">
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
            </ImageBackground>
            <Text className="text-clean font-semibold mt-2 text-center">
              {movie.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default HomeScreen;
