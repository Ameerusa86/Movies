// components/CastList.tsx

import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { CastMember } from "@/types/types";

interface CastListProps {
  cast: CastMember[];
}

const CastList: React.FC<CastListProps> = ({ cast }) => {
  return (
    <View className="mt-6">
      <Text className="text-white font-bold text-xl mb-4">Cast</Text>
      <FlatList
        data={cast}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mr-4 items-center w-24">
            <Image
              source={
                item.profile_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w200${item.profile_path}`,
                    }
                  : require("../assets/images/male.png") // Fallback image if no profile picture
              }
              className="w-full rounded-full bg-gray-300"
              style={{ height: 100, width: 100 }}
              resizeMode="cover"
            />
            <Text
              className="text-white font-semibold mt-2 text-sm"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text
              className="text-gray-400 text-xs text-center"
              numberOfLines={1}
            >
              {item.character}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CastList;
