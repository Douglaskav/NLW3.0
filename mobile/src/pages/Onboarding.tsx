import React from 'react'; 
import { Image, View } from 'react-native';

import OnBoarding from 'react-native-onboarding-swiper';
import {RectButton} from 'react-native-gesture-handler';

import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

interface SquareProps {
  isLight: boolean;
  selected: boolean;
}


export default function Onboarding() {
  const navigation = useNavigation();

  const Square = (props: SquareProps) => {
    let backgroundColor, width;
    if (props.isLight) {
      backgroundColor = props.selected ? '#FFD152' : '#BECFD8';
      width = props.selected ? 16 : 8;
    } else {
      backgroundColor = props.selected ? 'green' : 'blue';
    }

    return (
      <View
        style={{
          width,
          height: 4,
          marginHorizontal: 3,
          backgroundColor: backgroundColor,
          borderRadius: 4
        }}
      />
    )
  }

  const Next = ({ ...props }) => (
    <RectButton 
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 56,
        backgroundColor: '#D1EDF2',
        borderRadius: 15,
        margin: 30,
        marginBottom: 60
      }}
      {...props}
    >
      <AntDesign name="arrowright" size={24} color="#15B6D6" />
    </RectButton>
  )

  return (
    <OnBoarding
      bottomBarHighlight={false}
      DotComponent={Square}
      NextButtonComponent={Next}
      DoneButtonComponent={Next}
      onDone={(() => navigation.navigate('OrphanagesMap'))}
      showSkip={false}
      pages={[
        {
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
          titleStyles: { 
            color: '#0089A5',
            fontSize: 48,
            fontFamily: 'Nunito_800ExtraBold',
            lineHeight: 48,
            width: 230,
            textAlign: 'left',
            marginLeft: -60,
            marginTop: -30
          },
          subTitleStyles: {
            color: '#5C8599',
            fontSize: 20,
            fontFamily: 'Nunito_600SemiBold',
            lineHeight: 30,
            width: 230,
            textAlign: 'left',
            marginLeft: -60
          },
          backgroundColor: '#F2F3F5',
          image: <Image source={require('../images/Ilustra01.png')} style={{ width: 230, height: 230, marginTop: -50 }} />
        },
        {
          title: 'Escolha um orfanato no mapa e faça uma visita',
          titleStyles: { 
            color: '#0089A5',
            fontFamily: 'Nunito_800ExtraBold',
            width: 253,
            fontSize: 30,
            lineHeight: 36,
            textAlign: 'right',
            marginRight: -40,
            marginTop: -20
          },
          subtitle: '',
          backgroundColor: '#F2F3F5',
          image: <Image source={require('../images/Ilustra02.png')} style={{ width: 260, height: 380, marginTop: -30 }} />
        }
      ]}
    />
  ) 
}
