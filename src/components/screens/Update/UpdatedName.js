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

const UpdatedName = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    // Récupérer les données utilisateur depuis les paramètres de la route
    const { userData } = route.params;
    console.log(userData); 
    setUserData(userData);
  }, []);

  useEffect(() => {
    console.log(userData); // Vérifier les données de l'utilisateur dans la console
  }, [userData]);

  const updateName = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          axios
            .put(
              'http://192.168.1.86:3000/user/name',
              { name: newName },
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
                text1: 'Nom mis à jour',
                text2: 'Le nom a été mis à jour avec succès',
                visibilityTime: 2000,
              });

              
            })
            .catch(error => {
              console.log(error);
              Toast.show({
                type: 'error',
                text1: 'Erreur de mise à jour',
                text2: "Une erreur s'est produite lors de la mise à jour du nom",
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
              placeholder="Nouveau Nom/Prénom"
              color="rgba(0, 0, 0, 0.4)"
              onChangeText={text => setNewName(text)}
              value={newName}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={updateName}>
            <Text style={styles.buttonText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default UpdatedName;
