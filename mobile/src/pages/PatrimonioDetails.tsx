import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';

interface PatrimonioDeatailsRouteParams {
  id: number;
}

interface Patrimonio {
  id: number;
  type: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  notes: string;
  images: Array<{
    id: number;
    url: string;
  }>
}

export default function OrphanageDetails() {
  const route = useRoute();

  const params = route.params as PatrimonioDeatailsRouteParams;

  const [patrimonio, setPatrimonio] = useState<Patrimonio>();

  useEffect(() => {
    api.get(`patrimonios/${params.id}`).then(response => setPatrimonio(response.data));
  },[params.id]);

  if (!patrimonio) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {patrimonio.images.map(image => {
            return (
              <Image 
                key={image.id}
                style={styles.image} 
                source={{ uri: image.url }}
              />
            );
          })}
          
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.description}>{patrimonio.type}</Text>
        <Text style={styles.title}>{patrimonio.name}</Text>
        <Text style={styles.description}>{patrimonio.address}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: Number(patrimonio.latitude),
              longitude: Number(patrimonio.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              coordinate={{ 
                latitude: Number(patrimonio.latitude),
                longitude: Number(patrimonio.longitude)
              }}
            />
          </MapView>

          <View style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </View>

        </View>

        <Text style={styles.description}>{patrimonio.notes}</Text>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Ocorrências</Text>
        
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
  },

  description: {
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})