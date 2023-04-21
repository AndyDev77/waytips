import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  homeImg: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#7D56C2',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#7D56C2',
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
    height: '60%',
  },
  containerCustom2: {
    display: 'flex',
    backgroundColor: '#fff',
    paddingTop: 35,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainerText: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  contentContainerTextWhere: {
    flex: 0.2,
    marginTop: 10,
    alignItems: 'center',
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
  // forgotpassword: {
  //   color: '#7D56C2',
  //   alignSelf: 'center',
  //   margin: 10,
  // },
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
  // contentContainerIcons: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   marginTop: -10,
  // },
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
});

export default styles;
