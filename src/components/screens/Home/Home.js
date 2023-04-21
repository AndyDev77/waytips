import React from 'react';
import {View, Text, ImageBackground, Pressable} from 'react-native';
import image from '../../../../assets/images/background.png';
import styles from '../../../common/formHomecss';

const Home = ({navigation}) => {
  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.homeImg}>
        <View style={styles.containerCustom}>
          {/* <View style={styles.buttonContainer}>
            <Image source={logo}></Image>
            <Text>Waytips</Text>
          </View> */}
        </View>
        <View style={styles.containerCustom2}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </Pressable>
          <View style={styles.contentContainerText}>
            <Text style={styles.TextBottomSheet}>
              Vous êtes déjà inscrits ?
              <Text
                style={styles.spanText}
                onPress={() => navigation.navigate('Login')}>
                {' '}
                Connectez-vous
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;