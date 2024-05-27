import React, { useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera to take pictures.',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
      // Proceed with camera usage
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
interface CameraProps {
  onPictureTaken?: (uri: string) => void; 
}

const CameraComponent: React.FC<CameraProps> = ({ onPictureTaken }) => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<RNCamera>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8 }; 
      const data = await cameraRef.current.takePictureAsync(options);
      console.log('Picture taken:', data.uri);
      if (onPictureTaken) {
        onPictureTaken(data.uri); 
      }
    }
  };

  return (
    <View style={styles.cameraContainer}>
      {isCameraReady ? (
        <RNCamera
          ref={cameraRef}
          style={styles.cameraPreview}
          androidCameraPermissionOptions={{
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
          }}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : (
        <Text>Waiting for camera...</Text>
      )}
      <Button title="Take Picture" disabled={!isCameraReady} onPress={takePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  cameraPreview: {
    flex: 1,
  },
});

export default CameraComponent;
