import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

interface PatrimonioDataRouteParams {
  position: { latitude: number, longitude: number};
}

export default function PatrimonioData() {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as PatrimonioDataRouteParams;

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [images, setImages] = useState<string[]>([]);
  
  async function handleCreatePatrimonio() {
    const { latitude, longitude } = params.position;

    const data = new FormData();
    
    data.append('type', type);
    data.append('name', name);
    data.append('address', address);
    data.append('notes', notes);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,

      } as any);
    });

    await api.post('patrimonios', data);

    navigation.navigate('PatrimoniosMap');

  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Acesso as fotos é obrigatório');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

        <Text style={styles.label}>Tipo (Praça, área verde, sistema de lazer...)</Text>
        <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
            autoCapitalize='characters'
        />
        
        <Text style={styles.label}>Nome</Text>
        <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize='characters'
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            autoCapitalize='characters'
        />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={notes}
        onChangeText={setNotes}
        autoCapitalize='characters'
      />

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImages}
            />
          )
        })}
      </View>


      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <RectButton style={styles.nextButton} onPress={handleCreatePatrimonio}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
  
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
  
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',

  },

  uploadedImages: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    
    fontSize: 16,
    color: '#FFF',
  }
})