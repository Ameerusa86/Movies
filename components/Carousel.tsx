// components/CarouselComponent.tsx
import { Movie } from "@/types/types";
import * as React from "react";
import { Dimensions, View, Text, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Pagination } from "react-native-snap-carousel";

interface CarouselComponentProps {
  data: Movie[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ data }) => {
  const width = Dimensions.get("window").width;
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <View className="w-full mt-4 items-center">
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <View className="px-2">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              className="w-3/4 h-40 rounded-lg overflow-hidden mx-auto"
              resizeMode="cover"
            />
            <Text
              className="text-center text-white text-lg font-semibold mt-2"
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </View>
        )}
        width={width * 0.75}
        onSnapToItem={(index) => setActiveSlide(index)}
        autoPlay
        autoPlayInterval={3000}
      />
    </View>
  );
};

export default CarouselComponent;
