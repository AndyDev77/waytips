import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import image from '../../../../assets/images/mapGrey.png';
import btnSide from '../../../../assets/images/burger.png';
import imageUserNone from '../../../../assets/images/user.png';
import photoLogo from '../../../../assets/images/Vector.png';
import LBtnModify from '../../../../assets/images/littleBtnModify.png';
import BBtnModify from '../../../../assets/images/bigBtnModify.png';
import styles from '../../../common/Presentcss';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

const Present = () => {
  const [userData, setUserData] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const navigation = useNavigation();

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

  const openSidebar = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.homeImg}>
        <View style={styles.containerCustom}>
          <Pressable onPress={openSidebar} style={styles.buttonContainer}>
            <Image source={btnSide} />
          </Pressable>
        </View>
        <View style={styles.containerCustom2}>
          <View style={styles.containerPresent}>
            <Text style={styles.titleParam}>Paramètrez votre voyage</Text>
            <TouchableOpacity style={styles.buttonParam}>
              <Text style={styles.buttonText}>C'est parti</Text>
            </TouchableOpacity>
            <Text style={styles.titleParam}>Activités du moment</Text>
            <TouchableOpacity style={styles.buttonParam}>
              <Text style={styles.buttonText}>Explorer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Present;
