import React, {useState} from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { useRoute, useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import { LinearGradient } from 'expo-linear-gradient';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [images, setImages] = useState<object[]>([]);
  
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;

  async function handleOrphanageData() {
    console.log(name, about, phone_number, images);
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita, precisamos de sua permisão ');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled) return;

    setImages([...images, result]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Dados</Text>
        <View style={styles.titleWhere}>
          <Text style={styles.activePage}>01</Text>
          <Text style={styles.pageWhereTitle}> - </Text>
          <Text style={styles.pageWhereTitle}>02</Text>
        </View>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.aboutTitle}>
        <Text style={styles.label}>Sobre</Text>
        <Text style={styles.limitChar}>Máximo de 300 caracteres.</Text>
      </View>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={about}
        onChangeText={setAbout}
        multiline
      />

      <Text style={styles.label}>Número do Whatsapp</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={phone_number}
        onChangeText={setPhoneNumber}
      />

      <Text style={styles.label}>Fotos</Text>
      <LinearGradient 
        colors={['#EDFFF6', '#FCF0F4']}
        start={{ x: .5, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.uploadedImagesContainer}
      >
        {images.map((image, index) => {
          return (
            <View key={index} style={styles.imageContainer}>
              <View style={styles.image}>
                <Image
                  key={image}
                  source={{ uri: image.uri }}
                  style={styles.uploadedImage}
                />
                <View style={styles.imageInfo}>
                  <Text style={styles.imageName}>imagem_01.jpg</Text>
                  <Text style={styles.imageWeight}>246kb</Text>
                </View>
              </View>
              <Feather style={{margin: 25}} name="x" size={24} color="#FF669D" />
            </View>
          )
        })}
      </LinearGradient>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <RectButton style={styles.nextButton} onPress={handleOrphanageData}> 
        <Text style={styles.nextButtonText}>Próximo</Text>
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
    fontFamily: 'Nunito_700Bold',
    alignItems: 'center',
  },

  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
    paddingBottom: 10,
    marginBottom: 24
  },

  titleWhere: {
    flexDirection: 'row'
  },

  pageWhereTitle: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Nunito_600SemiBold',
    color: '#8FA7B2'
  },

  activePage: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#5C8599'
  },

  aboutTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },
  
  limitChar: {
    color: '#8FA7B2',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 10
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
    backgroundColor: 'red',
    borderRadius: 20,
    height: 72,
    marginBottom: 10
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 10,
    margin: 5
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

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  image: {
    flexDirection: 'row'
  },

  imageInfo: {
    marginTop: 10,
    marginBottom: 10
  },

  imageName: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
    lineHeight: 25,
    color: '#37C77F'
  },
  
  imageWeight: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    lineHeight: 20,
    color: '#8FA7B2'
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
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
