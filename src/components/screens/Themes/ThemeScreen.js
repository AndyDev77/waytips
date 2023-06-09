import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import image from '../../../../assets/images/background-2.png';
import styles from '../../../common/formThemescss';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Themes = ({navigation}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data using the token from AsyncStorage
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          axios
            .get('http://192.168.1.86:3000/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              const data = response.data;
              setUserData(data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(userData); // Vérifier les données de l'utilisateur dans la console
  }, [userData]);

  // Liste des thèmes

  const themeList = [
    'Attraction',
    'Sport',
    'Détente',
    'Famille',
    'Musée',
    'Monument',
  ];

  const [themeSelectList, setThemeSelectList] = useState([]);

  const addTheme = theme => {
    if (!isThemesExist(theme)) {
      setThemeSelectList([...themeSelectList, theme]);
    } else {
      setThemeSelectList(themeSelectList.filter(e => e !== theme));
    }
  };

  console.log(themeSelectList);

  const isThemesExist = theme => {
    return themeSelectList.includes(theme);
  };

  const handleSubmit = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          // Vérifier la longueur des thèmes
          if (themeSelectList.length > 3) {
            Toast.show({
              type: 'error',
              text1: 'Au maximum 3 thèmes',
              position: 'top',
              visibilityTime: 2000,
              autoHide: true,
            });
            return;
          }
  
          if (themeSelectList.length === 0) {
            Toast.show({
              type: 'error',
              text1: 'Sélectionnez au moins 1 thèmes',
              position: 'top',
              visibilityTime: 2000,
              autoHide: true,
            });
            return;
          }
  
          axios
            .post('http://192.168.1.86:3000/user/themes', {
              themes: themeSelectList,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              // Traitement de la réponse si nécessaire
              console.log(response.data);
  
              // Afficher le toast de succès
              Toast.show({
                type: 'success',
                text1: 'Super vos thèmes ont étés ajoutés',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
              });
  
              // Naviguer vers la page de profil
              navigation.navigate('Profile');
            })
            .catch(error => {
              // Gestion des erreurs
              console.log(error);
  
              // Afficher le toast d'erreur
              Toast.show({
                type: 'error',
                text1: error.message,
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
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
              Bonjour, {userData ? userData.name : ''}
            </Text>
          </View>
          <View>
            <Text style={styles.subtitle}>
              Sélectionnez vos thèmes parmi ces propositions. Vous pourrez les
              modifier par la suite.
            </Text>
          </View>
          <View>
            {themeList.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.buttonThemes,
                    isThemesExist(item)
                      ? {
                          backgroundColor: '#7D56C2',
                          borderColor: '#7D56C2',
                        }
                      : {backgroundColor: 'white'},
                  ]}
                  onPress={() => addTheme(item)}>
                  <Text
                    style={[
                      styles.buttonTextThemes,
                      isThemesExist(item)
                        ? {color: 'white'}
                        : {color: '#7D56C2'},
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Themes;
