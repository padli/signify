// screens/Onboarding.tsx
import React from "react";
import { Image, Alert, View, Button, Text } from "react-native";

import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions();

  const handleContinue = async () => {
    const allPermissionsGranted = await requestAllPermissions();
    if (allPermissionsGranted) {
      // navigate to tabs
      router.replace("/(tabs)");
    } else {
      Alert.alert("To continue please provide permissions in settings");
    }
  };

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permission is required.");
      return false;
    }

    const microphoneStatus = await requestMicrophonePermission();
    if (!microphoneStatus.granted) {
      Alert.alert("Error", "Microphone permission is required.");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permission is required.");
      return false;
    }

    // only set to true once user provides permissions
    // this prevents taking user to home screen without permissions
    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }

  return (
    <View className="flex-1 justify-center p-4">
      <Image
        source={require("../assets/logo.png")} // Update the path to your logo image
        style={{ width: 400, height: 400, marginBottom: 0 }} // Adjust the size and style as needed
      />
      <View className="mb-4">
        <Text className="text-justify">
          Welcome to friend! To provide the best experience, this app requires
          permissions for the following:
        </Text>
      </View>
      <View className="mb-4">
        <Text>Camera Permissions</Text>
        <Text>🎥 For taking pictures and videos</Text>
      </View>
      <View className="mb-4">
        <Text>Microphone Permissions</Text>
        <Text>🎙️ For taking videos with audio</Text>
      </View>
      <View className="mb-4">
        <Text>Media Library Permissions</Text>
        <Text>📸 To save/view your amazing shots </Text>
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}
