import React from "react";
import { View, Text } from "react-native";
import { HeaderProps } from "../types/types";

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View className="py-4">
      <Text className="text-white text-3xl font-bold">{title}</Text>
    </View>
  );
};

export default Header;
