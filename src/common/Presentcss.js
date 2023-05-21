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
  containerCustom: {
    flex: 1,
    height: '10%',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  containerCustom2: {
    display:'flex',
    // backgroundColor: '#fff',
    paddingTop: 35,
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  containerPresent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleParam: {
    color: '#7D56C2',
    fontFamily: 'Poppins',
    fontSize: 30,
    fontWeight: '700',
  },

  buttonParam: {
    backgroundColor: '#FFAB00',
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 10,
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
});

export default styles;
