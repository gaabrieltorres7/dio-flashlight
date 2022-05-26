import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RnShake from 'react-native-shake';

import imageOn from './assets/icons/eco-light-on.png';
import imageOff from './assets/icons/eco-light-off.png';
import logoWhite from './assets/icons/logo-dio-white.png';
import logo from './assets/icons/logo-dio.png';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () =>
    setToggle(oldToggle => {
      return !oldToggle;
    });

  useEffect(() => {
    //liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //Quando chacoalhar o celular, o toggle mudará
    const subscription = RnShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa função será chamada quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={toggle ? imageOn : imageOff}
        />
        <Image
          style={[style.dioLogo, toggle ? style.logo : style.logoWhite]}
          source={toggle ? logo : logoWhite}
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
