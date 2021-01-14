import React, {useState} from 'react';
import { ScrollView, Text, TextInput, View, Switch, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

// import api from '../services/api';

export default function OrphanageVisit(props: any) {
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  async function createOrphanage() {
    const { name, about, phone_number, images, location} = props.route.params;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('phone_number', String(phone_number));
    data.append('latitude', String(location.latitude));
    data.append('longitude', String(location.longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image: object, index: number) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image.uri
      } as any);
    });

    await api.post('orphanage', data);
    console.log('ok');
  }

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
      <RectButton style={styles.finishButton} onPress={createOrphanage}> 
        <Text style={styles.finishButtonText}>Próximo</Text>
      </RectButton>
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

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  finishButton: {
    backgroundColor: '#3BDB8B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },

  finishButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }

}); 
