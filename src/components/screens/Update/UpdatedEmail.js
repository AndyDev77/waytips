import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import image from '../../../../assets/images/background.png';
import styles from '../../../common/formUpdatedNamecss';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdatedEmail = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    // Récupérer les données utilisateur depuis les paramètres de la route
    const { userData } = route.params;
    console.log(userData); 
    setUserData(userData);
  }, []);

  useEffect(() => {
    console.log(userData); // Vérifier les données de l'utilisateur dans la console
  }, [userData]);

  const updateEmail = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          axios
            .put(
              'http://192.168.1.86:3000/user/email',
              { email: newEmail },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(response => {
              const updatedUser = response.data;
              setUserData(updatedUser);
              navigation.navigate('Profile', { userData: updatedUser });
              Toast.show({
                type: 'success',
                text1: 'Email mis à jour',
                text2: 'L\'e-mail a été mis à jour avec succès',
                visibilityTime: 2000,
              });
            })
            .catch(error => {
              console.log(error);
              Toast.show({
                type: 'error',
                text1: 'Erreur de mise à jour',
                text2: "Une erreur s'est produite lors de la mise à jour de l'e-mail",
                visibilityTime: 2000,
              });
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.homeImg}>
        <View style={styles.containerCustom}></View>
        <View style={styles.containerCustom2}>
          <View style={styles.formgroup}>
            <TextInput
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              style={styles.input}
              placeholder="Nouvel E-mail"
              color="rgba(0, 0, 0, 0.4)"
              onChangeText={text => setNewEmail(text)}
              value={newEmail}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={updateEmail}>
            <Text style={styles.buttonText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default UpdatedEmail;