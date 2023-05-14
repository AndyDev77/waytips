import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Pressable,
} from 'react-native';
import image from '../../../../assets/images/background-2.png';
import styles from '../../../common/formThemescss';
import Toast from 'react-native-toast-message';

const Themes = () => {
    const themeList = [
      'Attraction',
      'Sport',
      'Détente',
      'Famille',
      'Musée',
      'Monument',
    ];
    const [themeSelectList, setThemeSelectList] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
  
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
       // Envoyer les données au serveur
    fetch('http://192.168.1.86:3000/themes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        themes: themeSelectList,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Traiter la réponse du serveur
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

    };
  
    return (
      <View style={styles.root}>
        <ImageBackground source={image} resizeMode="cover" style={styles.homeImg}>
          <View style={styles.containerCustom}></View>
          <View style={styles.containerCustom2}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Vos thèmes préférés</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>
                Choississez pari ces propositions. Vous pourrez les modifier par
                la suite.
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
      </View>
    );
  };

export default Themes;