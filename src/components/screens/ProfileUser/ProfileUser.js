import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import image from '../../../../assets/images/background-2.png';
import imageUserNone from '../../../../assets/images/user.png';
import photoLogo from '../../../../assets/images/Vector.png';
import LBtnModify from '../../../../assets/images/littleBtnModify.png';
import BBtnModify from '../../../../assets/images/bigBtnModify.png';
import styles from '../../../common/formProfilecss';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

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

  const handleAddImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé l'importation de l'image");
      } else if (response.error) {
        console.log("Erreur lors de l'importation de l'image:", response.error);
      } else {
        const selectedImageUri = response.assets[0].uri; // Accéder à l'URI depuis le tableau assets

        console.log("URI de l'image importée:", selectedImageUri);
        setSelectedImageUri(selectedImageUri); // Mettre à jour l'état avec l'URI de l'image sélectionnée

        // Envoyer l'URI de l'image au serveur pour le téléchargement
        const formData = new FormData();
        formData.append('profileImage', {
          uri: selectedImageUri,
          type: 'image/jpeg', // Remplacez par le type d'image approprié
          name: 'profile.jpg', // Remplacez par le nom de fichier souhaité
        });

        AsyncStorage.getItem('token')
          .then(token => {
            if (token) {
              axios
                .post(
                  'http://192.168.1.86:3000/user/profile-image',
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Assurez-vous d'inclure le token d'authentification
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                )
                .then(response => {
                  // Mettre à jour les données utilisateur après le téléchargement de l'image
                  const updatedUserData = response.data;
                  setUserData(updatedUserData);

                  console.log(
                    'Données utilisateur mises à jour:',
                    updatedUserData
                  );
                })
                .catch(error => {
                  console.log(
                    "Erreur lors du téléchargement de l'image:",
                    error
                  );
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const handleNameModify = () => {
    navigation.navigate('UpdatedName', { userData });
  };

  const handleEmailModify = () => {
    navigation.navigate('UpdatedEmail', { userData });
  };

  const handleThemesModify = () => {
    navigation.navigate('UpdatedThemes', { userData });
  }

  useEffect(() => {
    if (route.params && route.params.userData) {
      const updatedUserData = route.params.userData;
      setUserData(updatedUserData);
    }
  }, [route.params]);

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.homeImg}>
        <View style={styles.containerCustom}></View>
        <View style={styles.containerCustom2}>
          <View style={styles.contentContainerText}>
            <Text style={styles.title}>Votre Profil</Text>
          </View>
          <View style={styles.contentContainerText}>
            {userData && userData.profileImage ? (
              <Image
                source={{ uri: userData.profileImage }}
                style={styles.profileImage}
              />
            ) : selectedImageUri ? (
              <Image
                source={{ uri: selectedImageUri }}
                style={styles.profileImage}
              />
            ) : (
              <Image source={imageUserNone} style={styles.noProfileImage} />
            )}
            <TouchableOpacity onPress={handleAddImage}>
              <Image source={photoLogo} style={styles.photoLogocss} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainerText}>
            <Text style={styles.titleName}>
              {userData ? userData.name : ''}
              &nbsp;
              <TouchableOpacity onPress={handleNameModify}>
                <Image source={LBtnModify} />
              </TouchableOpacity>
            </Text>

            <Text style={styles.titleEmail}>
              {userData ? userData.email : ''}
              &nbsp;
              <TouchableOpacity onPress={handleEmailModify}>
                <Image source={LBtnModify} />
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.contentContainerButton}>
            {userData &&
              userData.themes &&
              userData.themes.length > 0 &&
              userData.themes.map((theme, index) => (
                <View key={index} style={styles.themeContainer}>
                  <Text style={styles.themesBtn}>{theme}</Text>
                  <TouchableOpacity onPress={handleThemesModify}>
                    <Image source={BBtnModify} style={styles.littleImg} />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          <View style={styles.contentContainerSubText}>
            <Text style={styles.textSub}>Vous êtes prêts ?</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Je me lance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Profile;
