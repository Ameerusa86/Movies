import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TvShow } from "@/types/types";
import { fetchTvShows } from "@/services/TMDBapi";
import Card from "@/components/Card";

const screenWidth = Dimensions.get("window").width;

const TVShowsPage = () => {
  const [tvshows, setTvShows] = useState<TvShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTvShows = async () => {
      try {
        const tvShowsData = await fetchTvShows();
        setTvShows(tvShowsData);
      } catch (error) {
        console.error("Failed to load TV shows:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTvShows();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-primary"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Header */}
      <View className="px-4 py-6 items-center bg-primary">
        <Text className="text-clean text-3xl font-bold">TV Shows</Text>
        <Text className="text-secondary text-base mt-1">
          Explore popular TV Shows
        </Text>
      </View>

      {/* Movies Grid */}
      <View className="flex flex-row flex-wrap justify-between px-4">
        {tvshows.map((tvshow) => (
          <View
            key={tvshow.id}
            style={{ width: "48%", marginBottom: 16 }} // Two columns
          >
            <Card item={tvshow} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TVShowsPage;
