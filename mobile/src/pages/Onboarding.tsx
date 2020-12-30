import React from 'react'; 
import { Image, View, Button } from 'react-native';

import Oboarding from 'react-native-onboarding-swiper';

export default function Onboarding() {
  const Square = ({ isLight, selected  }) => {
    let backgroundColor;
    let width;
    if (isLight) {
      backgroundColor = selected ? '#FFD152' : '#BECFD8';
      width = selected ? 16 : 8;
    } else {
      backgroundColor = selected ? 'green' : 'blue';
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

  const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
  const color = isLight => backgroundColor(!isLight);

  const Skip = () => (
    <View />
  );

  const Next = ({ isLight, ...props }) => {
    <Button
      title={'Next'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
        backgroundColor: backgroundColor(isLight),
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    />
  }

  return (
    <Oboarding
      bottomBarHighlight={false}
      DotComponent={Square}
      NextButtonComponent={Next} 
      SkipButtonComponent={Skip}
      titleStyles={{ 
        color: '#0089A5',
        fontSize: 48,
        fontFamily: 'Nunito_800ExtraBold',
        lineHeight: 48,
        width: 230,
        textAlign: 'left',
        marginLeft: -60,
        marginTop: -30
      }}
      subTitleStyles={{
        color: '#5C8599',
        fontSize: 20,
        fontFamily: 'Nunito_600SemiBold',
        lineHeight: 30,
        width: 230,
        textAlign: 'left',
        marginLeft: -60
      }}
      pages={[
        {
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
          backgroundColor: '#F2F3F5',
          image: <Image source={require('../images/Ilustra01.png')} />
        },
        {
          title: 'Escolha um orfanato no mapa e faça uma visita',
          subtitle: '',
          backgroundColor: '#F2F3F5',
          image: <Image source={require('../images/Ilustra02.png')} />
        }
      ]}
    />
  ) 
}
