import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  homeImg: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 999
  },
  // buttonContainer: {
  //   flex: 1,
  //   marginTop: 15,
  //   justifyContent: 'center',
  // },
  button: {
    backgroundColor: '#FFAB00',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 30,
    marginVertical: 60,
    borderWidth: 1,
    borderColor: '#FFAB00',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins',
    lineHeight: 20,
    color: 'white',
  },
  containerCustom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  containerCustom2: {
    display: 'flex',
    backgroundColor: '#fff',
    paddingTop: 35,
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainerText: {
    flex: 0.4,
    alignItems: 'center',
    marginHorizontal: 20
  },
  contentContainerSubText:{
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45
  },
  textSub:{
    color: '#7D56C2',
    fontFamily: 'Poppins',
    fontSize: 24,
    marginTop: 80,
  },
  title: {
    color: '#7D56C2',
    fontFamily: 'Poppins',
    fontSize: 30,
    fontWeight: '700',
  },
  titleName: {
    color: '#7D56C2',
    fontFamily: 'Poppins',
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 60,
  },
  titleEmail: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 10,
    color: '#00000099'
  },
  TextBottomSheet: {
    color: '#7D56C2',
    fontFamily: 'Poppins',
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '400',
  },
  spanText: {
    color: '#FFAB00',
  },
  formgroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(160, 142, 193, 0.5)',
    borderRadius: 999,
    width: '83%',
    paddingLeft: 20,
    margin: 9,
  },
  errormessage: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#F50057',
    padding: 5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
  },
  contentContainerButton: {
    flex: 0.2,
    alignItems: 'center',
    flexDirection: 'row', // Ajout de cette ligne pour aligner les boutons horizontalement
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  themesBtn: {
    backgroundColor: '#7D56C2',
    borderRadius: 51,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
    width: 145,
    height: 44,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  littleImg:{
    marginLeft: -30
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: -20,
  },
  noProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: -20,
  },
  photoLogocss: {
    marginVertical: -50,
    width: 46,
    height: 42,
  },
  modifyButton: {
    backgroundColor: '#FFAB00'
  },
});

export default styles;
