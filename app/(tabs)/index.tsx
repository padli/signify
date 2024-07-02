import * as React from "react";
import {
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

import { CameraMode, CameraView, FlashMode } from "expo-camera";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import PictureView from "@/components/PictureView";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition
} from "react-native-reanimated";
import CameraTools from "@/components/CameraTools";
import { XCircle } from "lucide-react-native";

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">(
    "back"
  );
  const [cameraZoom, setCameraZoom] = React.useState<number>(0);
  const [picture, setPicture] = React.useState<string>("");
  const [isBrowsing, setIsBrowsing] = React.useState<boolean>(false);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [showCamera, setShowCamera] = React.useState<boolean>(false);

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  }

  async function toggleRecord() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
      // setVideo(response!.uri); // Uncomment if you want to handle video recording
    }
  }

  function handleShowCamera() {
    setShowCamera(true);
  }

  function handleCloseCamera() {
    setShowCamera(false);
    // Additional logic to reset camera state if needed
    // Example:
    // setCameraZoom(0);
    // setCameraFacing('back');
    // setCameraTorch(false);
    // setCameraFlash('off');
  }

  if (isBrowsing) return <></>;
  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;
  // if (video) return <VideoViewComponent video={video} setVideo={setVideo} />;

  if (showCamera) {
    return (
      <Animated.View
        layout={LinearTransition}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
        style={{ flex: 1 }}
      >
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={cameraFacing}
          mode={cameraMode}
          zoom={cameraZoom}
          enableTorch={cameraTorch}
          flash={cameraFlash}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onCameraReady={() => console.log("camera is ready")}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 6 }}>
              <CameraTools
                cameraZoom={cameraZoom}
                cameraFlash={cameraFlash}
                cameraTorch={cameraTorch}
                setCameraZoom={setCameraZoom}
                setCameraFacing={setCameraFacing}
                setCameraTorch={setCameraTorch}
                setCameraFlash={setCameraFlash}
              />
              {/* <MainRowActions
                isRecording={isRecording}
                handleTakePicture={
                  cameraMode === "picture" ? handleTakePicture : toggleRecord
                }
                cameraMode={cameraMode}
              /> */}
              <BottomRowTools
                cameraMode={cameraMode}
                setCameraMode={setCameraMode}
              />
            </View>
          </SafeAreaView>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 6,
              borderRadius: 8,
              marginTop: 40,
              marginBottom: 9
            }}
            onPress={handleCloseCamera}
          >
            <XCircle color="black" size={28} />
          </TouchableOpacity>
        </CameraView>
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/logo.png")} // Update the path to your logo image
        style={{ width: 400, height: 400, marginBottom: 0 }} // Adjust the size and style as needed
      />

      <Button title="Translate" onPress={handleShowCamera} />
    </View>
  );
}
