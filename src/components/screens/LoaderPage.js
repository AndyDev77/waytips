import React, { useEffect } from 'react';
import { View } from 'react-native';
import styles from '../../common/LoaderPagecss';
import LottieView from 'lottie-react-native';


const LoaderPage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <LottieView
        source={require('../../../assets/anim/Maps.json')} // chemin vers le fichier d'animation Lottie
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.navigate('Home')}
      />
    </View>
  )
}



export default LoaderPage