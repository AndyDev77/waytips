import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import image from '../../../../assets/images/background.png';
import styles from '../../../common/formLogincss';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    email: '',
    password: '',
  });

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    if (fdata.email === '' || fdata.password === '') {
      // ...
    } else {
      axios.post('http://192.168.1.86:3000/signin', fdata)
        .then(response => {
          const data = response.data;
          console.log('Server Response:', data); 
          if (data.error) {
            Toast.show({
              type: 'error',
              text1: data.error,
              position: 'top',
              visibilityTime: 2000,
              autoHide: true,
            });
          } else {
            // Store the token in AsyncStorage
            AsyncStorage.setItem('token', data.token)
              .then(() => {
                if (data.user && Array.isArray(data.user.themes) && data.user.themes.length === 0) {
                  console.log('Redirecting to Themes');
                  navigation.navigate('Themes');
                } else {
                  console.log('Redirecting to Profile');
                  navigation.navigate('Profile');
                }
                Toast.show({
                  type: 'success',
                  text1: 'Vous êtes conncté avec succès',
                  position: 'top',
                  visibilityTime: 2000,
                  autoHide: true,
                });
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.homeImg}>
        <View style={styles.containerCustom}>
          {/* <View style={styles.buttonContainer}>
            <Image source={logo} style={styles.homeLogo}></Image>
            <Text>Waytips</Text>
          </View> */}
        </View>
        {errormsg ? <Text style={styles.errormessage}>{errormsg}</Text> : null}
        <View style={styles.containerCustom2}>
          <View style={styles.formgroup}>
            <TextInput
              onPressIn={() => setErrormsg(null)}
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              style={styles.input}
              placeholder="Adresse mail"
              color="rgba(0, 0, 0, 0.4)"
              onChangeText={text => setFdata({...fdata, email: text})}
            />
            <TextInput
              onPressIn={() => setErrormsg(null)}
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              style={styles.input}
              placeholder="Mot de passe"
              color="rgba(0, 0, 0, 0.4)"
              secureTextEntry={true}
              onChangeText={text => setFdata({...fdata, password: text})}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => Sendtobackend()}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
          {/* <View style={styles.contentContainerText}>
          <Text style={styles.forgotpassword}>Mot de passe oublié ?</Text>
          </View> */}
          <View style={styles.contentContainerText}>
            <Text style={styles.TextBottomSheet}>
              Vous n'avez pas de compte ?
              <Text
                style={styles.spanText}
                onPress={() => navigation.navigate('Register')}>
                {' '}
                Inscrivez-vous
              </Text>
            </Text>
            {/* <Text style={styles.forgotpassword}>Mot de passe oublié ?</Text> */}
          </View>
        </View>
      </ImageBackground>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Login;