import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import image from '../../../../assets/images/background-2.png';
import styles from '../../../common/formThemescss';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UpdatedThemes = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [newthemeSelectList, setnewthemeSelectList] = useState([]);

  useEffect(() => {
    // Récupérer les données utilisateur depuis les paramètres de la route
    const { userData } = route.params;
    console.log(userData); 
    setUserData(userData);
  }, []);

  useEffect(() => {
    console.log(userData); // Vérifier les données de l'utilisateur dans la console
  }, [userData]);

  const themeList = [
    'Attraction',
    'Sport',
    'Détente',
    'Famille',
    'Musée',
    'Monument',
  ];

  const addTheme = theme => {
    if (!isThemesExist(theme)) {
      setnewthemeSelectList([...newthemeSelectList, theme]);
    } else {
      setnewthemeSelectList(newthemeSelectList.filter(e => e !== theme));
    }
  };

  const isThemesExist = theme => {
    return newthemeSelectList.includes(theme);
  };

  const updateThemes = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          // Vérifier la longueur des thèmes
          if (newthemeSelectList.length > 3) {
            Toast.show({
              type: 'error',
              text1: 'Au maximum 3 thèmes',
              position: 'top',
              visibilityTime: 2000,
              autoHide: true,
            });
            return;
          }

          if (newthemeSelectList.length === 0) {
            Toast.show({
              type: 'error',
              text1: 'Sélectionnez au moins 1 thème',
              position: 'top',
              visibilityTime: 2000,
              autoHide: true,
            });
            return;
          }

          axios
            .put(
              'http://192.168.1.86:3000/user/themes',
              {
                themes: newthemeSelectList,
              },
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
                text1: 'Thèmes mis à jour',
                text2: 'Les thèmes ont étés mis à jour avec succès',
                visibilityTime: 2000,
              });

              
            })
            .catch(error => {
              // Gestion des erreurs
              console.log(error);
              Toast.show({
                type: 'error',
                text1: 'Erreur de mise à jour',
                text2: "Une erreur s'est produite lors de la mise à jour des thèmes",
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
          <View style={styles.containerTitle}>
            <Text style={styles.title}>
              {userData ? userData.name : ''}
            </Text>
          </View>
          <View>
            <Text style={styles.subtitle}>
              Modifier vos thèmes !
            </Text>
          </View>
          <View>
            {themeList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.buttonThemes,
                    isThemesExist(item)
                      ? {
                          backgroundColor: '#7D56C2',
                          borderColor: '#7D56C2',
                        }
                      : { backgroundColor: 'white' },
                  ]}
                  onPress={() => addTheme(item)}
                >
                  <Text
                    style={[
                      styles.buttonTextThemes,
                      isThemesExist(item)
                        ? { color: 'white' }
                        : { color: '#7D56C2' },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={updateThemes}
            >
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default UpdatedThemes;