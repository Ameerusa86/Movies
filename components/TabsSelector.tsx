// components/Tabs.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const TabsSelector: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View className="mt-6">
      {/* Tab Headers */}
      <View className="flex-row justify-between mx-4 bg-gray-800 rounded-lg p-1">
        {tabs.map((tab: Tab, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(index)}
            className={`flex-1 text-white items-center py-2 rounded-lg ${
              activeTab === index ? "bg-blue-500" : ""
            }`}
          >
            <Text
              className={`text-md font-semibold ${
                activeTab === index ? "text-white" : "text-gray-400"
              }`}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View className="mt-4">{tabs[activeTab].content}</View>
    </View>
  );
};

export default TabsSelector;
