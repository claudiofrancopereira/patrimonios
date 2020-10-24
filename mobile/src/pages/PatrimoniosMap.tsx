import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import api from '../services/api';

interface Patrimonio {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function PatrimoniosMap() {
  const navigation = useNavigation();

  const [initialLatitude, setInitialLatitude] = useState(0);
  const [initialLongitude, setInitialLongitude] = useState(0);

  const [patrimonios, setPatrimonios] = useState<Patrimonio[]>([]);

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

  
  useFocusEffect(() => {
    api.get('patrimonios').then(response => {
      setPatrimonios(response.data);
    });

  });

  function handleNavigateToPatrimonioDetails(id: number) {
    navigation.navigate('PatrimonioDetails', { id });
  }
  
  function handleNavigateToCreatePatrimonio() {
    navigation.navigate('SelectMapPosition');
  }

  if (initialLatitude === 0 || initialLongitude === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        }}
      >
        <Marker
          pinColor='blue'
          coordinate={{
            latitude: initialLatitude,
            longitude: initialLongitude,
          }}
        />

        {patrimonios.map(patrimonio => {
          return (
            <Marker
              key={patrimonio.id}
              coordinate={{
                latitude: Number(patrimonio.latitude),
                longitude: Number(patrimonio.longitude)
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToPatrimonioDetails(patrimonio.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{patrimonio.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{patrimonios.length} patrimonios encontrados</Text>

        <RectButton style={styles.createPatrimonioButton} onPress={handleNavigateToCreatePatrimonio}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
  
    footerText: {
  
      color: '#8fa7b3',
  
    },
  
    createPatrimonioButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
  
    },
  
  
});
  