import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE }  from 'react-native-maps';
import { Feather  } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';

import * as Location from 'expo-location';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string,
  latitude: number;
  longitude: number;
}

export default function OrphanageMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('A gente precisa de sua localização para monstrarmos os orfanatos.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setLocation([latitude, longitude]);
    })();
  }, []);


  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data); 
    });
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      {location[0] !== 0 && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          loadingEnabled={location[0] === 0}
          initialRegion={{
            latitude: location[0],
            longitude: location[1],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }} 
        >
          {orphanages.map(orphanage => {
            return (
              <Marker 
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
              >
                <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>  
              </Marker>
            );
          })} 
        </MapView>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orfanatos Encontrados.</Text>
  
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF"  />
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
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 168,
    minHeight: 48,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089A5',
    fontSize: 14
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
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  } 
});
