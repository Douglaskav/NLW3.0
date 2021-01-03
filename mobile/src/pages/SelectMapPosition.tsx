import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import * as Location from 'expo-location';

import mapMarkerImg from '../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  function handleNextStep() {
    navigation.navigate('OrphanageData', { location });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setLocation([event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude]);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("A gente precisa saber sua localização para mostrar os orfanatos perto de você.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setLocation([latitude, longitude]);
    })();
  }, []);



  return (
    <View style={styles.container}>
      {location[0] !== 0 && (
        <MapView 
          loadingEnabled={location[0] === 0}
          initialRegion={{
            latitude: location[0],
            longitude: location[1],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          { location[0] !== 0 && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ latitude: location[0], longitude: location[1] }}
            />
          ) }
        </MapView>
      )}
      { location[0] !== 0 && (
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
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
