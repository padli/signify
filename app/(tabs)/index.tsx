import React from "react";
import { View, Text, Image } from "react-native";

const HomeScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center p-4">
      <Image
        source={require("../../assets/logo.png")} // Update the path to your logo image
        style={{ width: 400, height: 400, marginBottom: 0 }} // Adjust the size and style as needed
      />

      <View className=" bg-[#1c3a80] rounded-xl px-8 py-4">
        <Text className="text-center text-white font-bold">Translate</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
