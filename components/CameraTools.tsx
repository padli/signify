import { View } from 'react-native';
import { Flashlight, Camera, ArrowRightCircle, SwitchCamera } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { FlashMode } from 'expo-camera';

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<'front' | 'back'>>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}

export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
}: CameraToolsProps) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 22,
        zIndex: 1,
        gap: 10,
        marginTop: 120,
      }}
    >

      <SwitchCamera
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === 'back' ? 'front' : 'back'
          )
        }
        color="white"
        size={28}
      />
      <Link href="/Page1">
        <ArrowRightCircle color="white" size={28} />
      </Link>
    
    </View>
  );
}
