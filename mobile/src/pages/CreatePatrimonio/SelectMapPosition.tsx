import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';

export default function SelectMapPosition() {
  const navigation = useNavigation();

  const [initialLatitude, setInitialLatitude] = useState(0);
  const [initialLongitude, setInitialLongitude] = useState(0);
  
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({ accuracy: 6 });

        setInitialLatitude(coords.latitude);
        setInitialLongitude(coords.longitude);

      }
    }    

    loadInitialPosition();

  },[]);
  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('PatrimonioData', { position });
  }

  if (initialLatitude === 0 || initialLongitude === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        }}
        onPress={handleSelectMapPosition}
        style={styles.mapStyle}
      >
        <Marker
          pinColor='blue'
          coordinate={{
            latitude: initialLatitude,
            longitude: initialLongitude,
          }}
        />

        { !!position.latitude && (
          <Marker 
            coordinate={position}
          />
        )}
      </MapView>

      { !!position.latitude && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
  }
})