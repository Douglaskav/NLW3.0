import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View, Switch, StyleSheet} from 'react-native';

import api from '../services/api';

export default function OrphanageVisit() {
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Visitação</Text>
        <View style={styles.titleWhere}>
          <Text style={styles.pageWhereTitle}>01</Text>
          <Text style={styles.pageWhereTitle}> - </Text>
          <Text style={styles.activePage}>02</Text>
        </View> 
      </View>
      
      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>
    </ScrollView>
  );
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
    paddingBottom: 20,
    marginBottom: 30
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
}); 
